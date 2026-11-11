import sys, zipfile, pickle, numpy as np, onnx
from onnx import helper, TensorProto, numpy_helper
pth, out = sys.argv[1], sys.argv[2]
z = zipfile.ZipFile(pth)
pkl = [n for n in z.namelist() if n.endswith('data.pkl')][0]
root = pkl[:-len('data.pkl')]
class Storage:
    def __init__(s, dtype, key): s.dtype, s.key = dtype, key
def rebuild(storage, offset, size, stride, *a):
    arr = np.frombuffer(z.read(root + 'data/' + storage.key), dtype=storage.dtype)
    n = int(np.prod(size)) if size else 1
    return arr[offset:offset+n].reshape(size).copy()
class U(pickle.Unpickler):
    def find_class(s, mod, name):
        if name == '_rebuild_tensor_v2': return rebuild
        if name == 'FloatStorage': return np.float32
        if name == 'OrderedDict':
            import collections; return collections.OrderedDict
        if name == '_rebuild_parameter': return lambda d, *a: d
        raise pickle.UnpicklingError(f'{mod}.{name}')
    def persistent_load(s, pid):
        return Storage(pid[1], pid[2])
sd = U(z.open(pkl)).load()
if 'params' in sd: sd = sd['params']
if 'params_ema' in sd: sd = sd['params_ema']
idx = sorted({int(k.split('.')[1]) for k in sd})
nodes, inits = [], []
cur = 'x'
for i in idx:
    w = sd[f'body.{i}.weight']
    if w.ndim == 4:
        inits += [numpy_helper.from_array(w, f'w{i}'), numpy_helper.from_array(sd[f'body.{i}.bias'], f'b{i}')]
        nodes.append(helper.make_node('Conv', [cur, f'w{i}', f'b{i}'], [f't{i}'], pads=[1,1,1,1]))
    else:
        inits.append(numpy_helper.from_array(w.reshape(-1,1,1), f'w{i}'))
        nodes.append(helper.make_node('PRelu', [cur, f'w{i}'], [f't{i}']))
    cur = f't{i}'
print('layers', len(idx), 'last conv out', sd[f'body.{idx[-1]}.weight'].shape)
nodes.append(helper.make_node('DepthToSpace', [cur], ['ps'], blocksize=4, mode='CRD'))
inits.append(numpy_helper.from_array(np.array([1,1,4,4], np.float32), 'scales'))
nodes.append(helper.make_node('Resize', ['x', '', 'scales'], ['base'], mode='nearest'))
nodes.append(helper.make_node('Add', ['ps', 'base'], ['y']))
g = helper.make_graph(nodes, 'srvgg', [helper.make_tensor_value_info('x', TensorProto.FLOAT, [1,3,'h','w'])],
    [helper.make_tensor_value_info('y', TensorProto.FLOAT, [1,3,'H','W'])], inits)
m = helper.make_model(g, opset_imports=[helper.make_opsetid('', 13)]); m.ir_version = 8
onnx.checker.check_model(m); onnx.save(m, out)

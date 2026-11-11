import sys, time, numpy as np, onnxruntime as ort
from PIL import Image
sess = ort.InferenceSession(sys.argv[1], providers=['CPUExecutionProvider'])
x0, w = int(sys.argv[2]), int(sys.argv[3]); outdir = sys.argv[4]
for f in sys.argv[5:]:
    t = time.time()
    im = Image.open(f).convert('RGB'); im = im.crop((x0, 0, x0 + w, im.height))
    x = np.asarray(im, np.float32).transpose(2,0,1)[None] / 255
    y = sess.run(None, {'x': x})[0][0].clip(0,1).transpose(1,2,0)
    Image.fromarray((y*255).round().astype(np.uint8)).save(f"{outdir}/{f.split('/')[-1]}")
    print(f, round(time.time()-t,1), flush=True)

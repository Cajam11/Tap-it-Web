import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const outDir = path.join(process.cwd(), "public", "hero-clouds");
fs.mkdirSync(outDir, { recursive: true });

function crc32(buf) {
  if (!crc32.table) {
    crc32.table = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crc32.table[n] = c >>> 0;
    }
  }

  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c = crc32.table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBuf.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 8 + data.length);
  return out;
}

function createPng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(
      raw,
      y * (width * 4 + 1) + 1,
      y * width * 4,
      (y + 1) * width * 4,
    );
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function smoothNoise(width, height, seed, scale) {
  const random = seededRandom(seed);
  const gridWidth = Math.ceil(width / scale) + 2;
  const gridHeight = Math.ceil(height / scale) + 2;
  const grid = Array.from({ length: gridHeight }, () =>
    Array.from({ length: gridWidth }, () => random()),
  );
  const fade = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;

  return (x, y) => {
    const gx = x / scale;
    const gy = y / scale;
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const tx = fade(gx - x0);
    const ty = fade(gy - y0);
    const a = lerp(grid[y0][x0], grid[y0][x0 + 1], tx);
    const b = lerp(grid[y0 + 1][x0], grid[y0 + 1][x0 + 1], tx);
    return lerp(a, b, ty);
  };
}

function makeCloud(file, width, height, seed, tint) {
  const random = seededRandom(seed);
  const blobs = [];

  for (let i = 0; i < 22; i += 1) {
    blobs.push({
      cx: width * (0.1 + random() * 0.8),
      cy: height * (0.36 + (random() - 0.5) * 0.35),
      rx: width * (0.07 + random() * 0.11),
      ry: height * (0.12 + random() * 0.16),
      weight: 0.6 + random() * 0.68,
    });
  }

  blobs.push({
    cx: width * 0.5,
    cy: height * 0.57,
    rx: width * 0.34,
    ry: height * 0.13,
    weight: 0.42,
  });

  const noiseA = smoothNoise(width, height, seed + 17, 42);
  const noiseB = smoothNoise(width, height, seed + 41, 92);
  const buffer = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let density = 0;

      for (const blob of blobs) {
        const dx = (x - blob.cx) / blob.rx;
        const dy = (y - blob.cy) / blob.ry;
        density += Math.exp(-(dx * dx + dy * dy) * 1.62) * blob.weight;
      }

      const nx = x / width - 0.5;
      const ny = y / height - 0.52;
      const edge = Math.max(
        0,
        1 - Math.abs(nx / 0.52) ** 4 - Math.abs(ny / 0.48) ** 4,
      );
      const texture = 0.66 + noiseA(x, y) * 0.38 + noiseB(x, y) * 0.22;
      const cloud = density * texture;
      const softMask = Math.max(0, Math.min(1, (cloud - 0.34) / 1.08));
      const alpha = softMask * softMask * (3 - 2 * softMask) * edge ** 2.15;
      const shade =
        0.92 +
        Math.min(0.16, density * 0.035) -
        (y / height) * 0.08 +
        (noiseA(x + 19, y + 7) - 0.5) * 0.04;
      const offset = (y * width + x) * 4;

      buffer[offset] = Math.max(0, Math.min(255, Math.round(tint[0] * shade)));
      buffer[offset + 1] = Math.max(
        0,
        Math.min(255, Math.round(tint[1] * shade)),
      );
      buffer[offset + 2] = Math.max(
        0,
        Math.min(255, Math.round(tint[2] * shade)),
      );
      buffer[offset + 3] = Math.max(
        0,
        Math.min(225, Math.round(alpha ** 1.12 * 220)),
      );
    }
  }

  fs.writeFileSync(path.join(outDir, file), createPng(width, height, buffer));
}

makeCloud("cloud-left.png", 900, 380, 4217, [255, 255, 255]);
makeCloud("cloud-right.png", 820, 330, 8821, [248, 252, 255]);
makeCloud("cloud-low.png", 980, 390, 13091, [252, 253, 255]);

console.log("Generated hero cloud PNGs.");

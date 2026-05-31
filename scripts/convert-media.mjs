import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();

const imageJobs = [
  { src: 'public/made-pdp/thumb-made-configurator.png', widths: [640, 960, 1440] },
  { src: 'public/xplabs/thumb-xp-labs.png', widths: [640, 960, 1440] },
  { src: 'public/product-ml/01-Product ML Game Health@2x.jpg', widths: [640, 960, 1440] },
  { src: 'public/product-ml/02-Product ML Game Design Copy@2x.jpg', widths: [640, 960, 1440] },
  { src: 'public/product-ml/03-Product ML Models@2x.jpg', widths: [640, 960, 1440] },
  { src: 'public/product-ml/04-Product ML Policies@2x.jpg', widths: [640, 960, 1440] },
  { src: 'public/product-ml/05-Product ML Rollout Copy@2x.jpg', widths: [640, 960, 1440] },
  { src: 'public/xplabs/DesktopPDP-Sedu.png', widths: [720, 1080, 1440] },
  { src: 'public/xplabs/DesktopPDP-Scooch.png', widths: [720, 1080, 1440] },
  { src: 'public/xplabs/MobilePDP-Sedu.png', widths: [375, 750] },
  { src: 'public/xplabs/MobilePDP-Scooch.png', widths: [375, 750] },
  { src: 'public/xplabs/MobilePLP-Sedu.png', widths: [375, 750] },
  { src: 'public/xplabs/MobilePLP-Scooch.png', widths: [375, 750] },
  { src: 'public/xplabs/Colors.png', widths: [700, 1100, 1400] },
  { src: 'public/xplabs/Text.png', widths: [700, 1100, 1400] },
  { src: 'public/xplabs/Buttons.png', widths: [700, 1100, 1400] },
  { src: 'public/xplabs/Inputs.png', widths: [700, 1100, 1400] },
  { src: 'public/xplabs/Displays.png', widths: [700, 1100, 1400] },
  { src: 'public/xplabs/Icons.png', widths: [700, 1100, 1400] },
];

const videoJobs = [
  {
    src: 'public/made-pdp/Mobile PDP.mov',
    out: 'public/made-pdp/Mobile PDP-mobile.mp4',
    poster: 'public/made-pdp/Mobile PDP-poster.jpg',
    vf: null,
    crf: '19',
  },
  {
    src: 'public/made-pdp/Desktop PDP.mov',
    out: 'public/made-pdp/Desktop PDP-tablet.mp4',
    poster: 'public/made-pdp/Desktop PDP-poster.jpg',
    vf: 'scale=1440:-2:flags=lanczos',
    crf: '18',
  },
  {
    src: 'public/made-pdp/Desktop PDP.mov',
    out: 'public/made-pdp/Desktop PDP-desktop.mp4',
    poster: null,
    vf: 'scale=1920:-2:flags=lanczos',
    crf: '18',
  },
  {
    src: 'public/made-pdp/ListingPage Sofa.mov',
    out: 'public/made-pdp/ListingPage Sofa.mp4',
    poster: 'public/made-pdp/ListingPage Sofa-poster.jpg',
    vf: null,
    crf: '19',
  },
  {
    src: 'public/made-pdp/ProductPage Tubby.mov',
    out: 'public/made-pdp/ProductPage Tubby.mp4',
    poster: 'public/made-pdp/ProductPage Tubby-poster.jpg',
    vf: null,
    crf: '19',
  },
];

function withoutExtension(filePath) {
  return filePath.replace(/\.[^.]+$/, '');
}

function run(command, args) {
  execFileSync(command, args, { stdio: 'inherit' });
}

for (const job of imageJobs) {
  const input = join(root, job.src);
  const stem = withoutExtension(input);

  for (const width of job.widths) {
    const output = `${stem}-${width}.webp`;
    mkdirSync(dirname(output), { recursive: true });
    run('ffmpeg', [
      '-y',
      '-i',
      input,
      '-vf',
      `scale=${width}:-2:flags=lanczos`,
      '-vcodec',
      'libwebp',
      '-compression_level',
      '6',
      '-quality',
      '82',
      output,
    ]);
  }
}

for (const job of videoJobs) {
  const input = join(root, job.src);
  const output = join(root, job.out);
  const poster = job.poster ? join(root, job.poster) : null;

  mkdirSync(dirname(output), { recursive: true });

  run('ffmpeg', [
    '-y',
    '-i',
    input,
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    job.crf,
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-color_primaries',
    'bt709',
    '-color_trc',
    'bt709',
    '-colorspace',
    'bt709',
    ...(job.vf ? ['-vf', job.vf] : []),
    output,
  ]);

  if (poster) {
    run('ffmpeg', [
      '-y',
      '-ss',
      '00:00:01',
      '-i',
      input,
      '-frames:v',
      '1',
      '-update',
      '1',
      '-q:v',
      '2',
      poster,
    ]);
  }
}

# Product Hunt launch assets

Gallery images (1270×760 @2x) and a 35 s, 1080p demo video, built from the real product screenshots in `src/assets/screens`.

| File | What |
| --- | --- |
| `out/1-hero.png`, `out/2-capture.png`, `out/3-ats-check.png` | Gallery images |
| `out/resumelog-demo.mp4` | Demo video (H.264, 1920×1080, 30 fps, no audio) |
| `gallery.html` (`?n=1..3`), `video.html`, `shared.css` | Sources — open in Chrome to preview |

## Regenerate

Needs Node, Playwright 1.55 and ffmpeg. Set the Chromium path inside the scripts if yours differs.

```sh
node render-gallery.mjs "$PWD"
node render-video.mjs "$PWD" full ./frames      # use `preview` for 8 sample frames
ffmpeg -framerate 30 -i frames/f-%05d.jpg -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart out/resumelog-demo.mp4
```

`video.html` is a seekable timeline (`window.seek(t)`), so every frame is deterministic.

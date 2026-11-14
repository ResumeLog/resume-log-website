"""
Original soundtrack for out/resumelog-demo.mp4, synthesised from scratch (no samples,
no third-party music), so it is safe to publish on YouTube.

Chords change on the video's scene cuts (video.html timeline):
  0.0 problem Am7 · 4.2 intro Fmaj7 · 9.0 capture C · 15.0 table G · 20.0 ATS Am7
  26.0 follow-up Fmaj7 · 30.5 end card Cmaj9 (resolves)
plus UI sound effects: click on Save (11.55 s), pop on the "Saved" toast (12.0 s),
soft whooshes on scene cuts.

    python soundtrack.py out/soundtrack.wav
"""
import sys
import wave

import numpy as np

SR = 44100
DUR = 35.5
N = int(SR * DUR)
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def t_of(n):
    return np.arange(n) / SR


def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    L[i : i + len(sig)] += sig * gain * (1 - pan) / 1.0
    R[i : i + len(sig)] += sig * gain * (1 + pan) / 1.0


def lowpass(x, width):
    k = np.ones(width) / width
    return np.convolve(x, k, mode="same")


# ---------- chords (scene-aligned) ----------
chords = [
    (0.0, [57, 60, 64, 67]),   # Am7
    (4.2, [53, 57, 60, 64]),   # Fmaj7
    (9.0, [48, 55, 60, 64]),   # C
    (15.0, [55, 59, 62, 67]),  # G
    (20.0, [57, 60, 64, 67]),  # Am7
    (26.0, [53, 57, 60, 64]),  # Fmaj7
    (30.5, [48, 55, 59, 62, 64]),  # Cmaj9
]
ends = [c[0] for c in chords[1:]] + [DUR]


def chord_at(t):
    for (s, notes), e in zip(chords, ends):
        if s <= t < e:
            return notes
    return chords[-1][1]


# ---------- pad: soft additive tones, slow swell, overlapping crossfades ----------
for (start, notes), end in zip(chords, ends):
    length = end - start + 1.2  # overlap into the next chord
    n = int(length * SR)
    t = t_of(n)
    env = np.minimum(1, t / 0.9) * np.minimum(1, np.maximum(0, (length - t) / 1.2))
    if start == 30.5:  # last chord rings and fades to silence by the end
        length = DUR - start
        n = int(length * SR)
        t = t_of(n)
        env = np.minimum(1, t / 0.6) * np.clip((length - t) / 3.5, 0, 1) ** 1.5
    for m in notes:
        f = midi(m)
        for side, det in ((-0.6, 0.997), (0.6, 1.003)):
            tone = (
                np.sin(2 * np.pi * f * det * t)
                + 0.35 * np.sin(2 * np.pi * 2 * f * det * t)
                + 0.12 * np.sin(2 * np.pi * 3 * f * det * t)
            )
            trem = 1 + 0.08 * np.sin(2 * np.pi * 0.25 * t + m)
            add(tone * env * trem, start, gain=0.022, pan=side)
    # sub bass on the root
    root = midi(notes[0] - 12)
    add(np.sin(2 * np.pi * root * t) * env, start, gain=0.05)

# ---------- pluck arpeggio, 8ths at 100 bpm ----------
step = 0.3
pattern = [0, 1, 2, 3, 2, 1, 2, 3]
k = 0
t0 = 0.0
while t0 < 31.0:
    notes = chord_at(t0)
    m = notes[pattern[k % len(pattern)] % len(notes)] + 12
    f = midi(m)
    n = int(0.9 * SR)
    t = t_of(n)
    env = np.exp(-t * 6.5) * np.minimum(1, t / 0.004)
    pl = (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)) * env
    g = 0.045 if t0 >= 4.2 else 0.03
    add(pl, t0, gain=g, pan=0.35 * np.sin(k * 0.9))
    # quiet echo
    add(pl, t0 + 0.45, gain=g * 0.3, pan=-0.35 * np.sin(k * 0.9))
    k += 1
    t0 += step

# ---------- light beat from the intro to the end card ----------
beat = 0.6
t0 = 4.2
i = 0
while t0 < 30.4:
    if i % 2 == 0:  # soft kick on 1 and 3
        n = int(0.35 * SR)
        t = t_of(n)
        f = 50 + 70 * np.exp(-t * 30)
        ph = 2 * np.pi * np.cumsum(f) / SR
        add(np.sin(ph) * np.exp(-t * 9), t0, gain=0.16)
    # shaker on the off-beat
    n = int(0.08 * SR)
    t = t_of(n)
    sh = rng.standard_normal(n)
    sh = sh - lowpass(sh, 6)  # keep the highs
    add(sh * np.exp(-t * 60), t0 + beat / 2, gain=0.018, pan=0.3)
    t0 += beat
    i += 1

# ---------- sound effects ----------
def whoosh(at, length=0.7, gain=0.06):
    n = int(length * SR)
    t = t_of(n)
    x = rng.standard_normal(n)
    for _ in range(3):  # stacked box filters ≈ smooth low-pass, no hiss
        x = lowpass(x, 28)
    x /= np.max(np.abs(x))
    env = np.sin(np.pi * t / length) ** 2
    add(x * env, at - length * 0.6, gain=gain, pan=-0.2)
    add(x[::-1] * env, at - length * 0.6, gain=gain * 0.8, pan=0.2)


for cut in (4.2, 9.0, 15.0, 20.0, 26.0, 30.5):
    whoosh(cut)
whoosh(21.6, 0.6, 0.035)  # ATS panel slides in

# click on Save
n = int(0.05 * SR)
t = t_of(n)
click = (np.sin(2 * np.pi * 2200 * t) * 0.6 + rng.standard_normal(n) * 0.4) * np.exp(-t * 140)
add(click, 11.55, gain=0.12)

# pop + rising chime for "Saved ✓"
n = int(0.12 * SR)
t = t_of(n)
f = 500 + 900 * (t / t[-1])
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30)
add(pop, 12.0, gain=0.12)
for j, m in enumerate((84, 88, 91)):  # C6 E6 G6
    n = int(0.8 * SR)
    t = t_of(n)
    add(np.sin(2 * np.pi * midi(m) * t) * np.exp(-t * 5), 12.05 + j * 0.07, gain=0.035, pan=0.2 * (j - 1))

# ---------- master ----------
mix = np.stack([L, R], axis=1)
fade_in = np.minimum(1, t_of(N) / 0.4)[:, None]
mix *= fade_in
mix = np.tanh(mix * 1.6) / np.tanh(1.6)  # gentle soft clip
mix *= 0.89 / np.max(np.abs(mix))  # about -1 dBFS peak

out = sys.argv[1] if len(sys.argv) > 1 else "out/soundtrack.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("wrote", out)

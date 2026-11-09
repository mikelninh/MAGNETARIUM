# MAGNETARIUM — Wonder Collection roadmap

> **Vision:** Turn an interactive magnetic-field visualiser into a beautiful, accurate and shareable place to explore nature. Wonder first; explanation on demand.

## Product promise

One surprising question → one immediately playable experiment → one observable outcome → one clear scientific explanation → one delightful invitation to share or try another.

Aim for visitors to make a meaningful change within the first **10 seconds**. Do not impose accounts or tutorials before play. Avoid streak pressure, manipulative gamification, or claims that geometry itself generates energy.

## Experiences to prototype (v5)

| Priority | Experience | Hook | Testable learning |
|---|---|---|---|
| P0 | **Magnet Dance** | Can you make two magnets dance without touching? | Attraction, repulsion and orientation |
| P0 | **Guess the Field** | Place the compass before revealing the field. | Direction and spatial prediction |
| P0 | **Electromagnet Crane** | How many virtual paperclips can a coil lift? | Current, turns and model limits |
| P1 | **Magnetic Maze** | Guide a bead with a magnetic field. | Forces and obstacles (model assumptions shown) |
| P1 | **Build a Generator** | What happens when the magnet moves through a coil? | Time-varying flux and induction; Faraday's law |
| P1 | **Inside the Torus** | Dive through a translucent 3D toroid. | Geometry vs idealised coil field |
| P1 | **Rose-Window Atelier** | Create a beautiful pattern from symmetry. | Rotations, tessellation and the distinction from electromagnetism |
| P2 | **Mystery of the Week** | One rotating, reproducible mini-discovery. | Predict–test–explain using recorded local parameters |

## Three entry points

**Explore** (default): immediate full-screen live simulation, one prominent intervention, no lengthy introductory prose. **Discover**: a 60–120 second illustrated challenge with optional explanation. **Teach**: 10–15 minute lesson structure with a printable/local worksheet, projector mode and an answer guide.

## Frictionless sharing and returning

- Every exhibit gets a stable URL (e.g. `#scene=magnet-dance`) and a reproducible parameter payload.
- Share a beautiful result card as image plus link, no account required; include experiment question and an invitation to try it.
- 'Challenge a friend' sends an initial state, and the recipient predicts what happens before pressing Reveal. Never fabricate head-to-head results.
- Curate one optional **Wonder of the Week** exhibit. No notifications by default, no streak loss or pressure.
- Host family mode: pass-the-phone two-person challenges. Use collaborative language instead of leaderboards for children.

## Education / teacher mode

- Teacher cards have question, prediction, intervention, observation, explanation, model caveat and a real-world low-risk extension.
- Ages ~8–11: qualitative directions, compass and attraction; ~12–15: compare current and turns; ~16+: equations and limitations.
- Include German and English language options, responsive large touch targets, keyboard access, captions and reduced-motion mode.
- Include standard physics vocabulary and links to reliable resources. Separate **artistic analogue** from **physical simulation** in every relevant scene.
- Offline access and printable lesson cards make classroom use practical without collecting student data.

## Mobile performance budget

- Keep canvas and one active control simultaneously visible on a 360×640 viewport.
- Draw at device-adaptive resolution and cap computationally expensive layers; downgrade gracefully at lower frame rates.
- Pause rendering when obscured; redraw static scenes only on changes; avoid rendering invisible elements.
- Test on budget Android as well as iPhone, including thermal/battery pressure and VoiceOver/TalkBack.
- Test interaction response after every release, not just visual screenshots.

## How to evaluate (targets, not measured outcomes)

Start with 10–15 observed usability sessions across children, families and teachers. Track only privacy-friendly aggregate events with explicit consent if analytics is introduced.

- Median time to first meaningful interaction: **under 10 sec**.
- First challenge completion: **at least 50%** of recruited first-time testers.
- Can users articulate one correct observation without seeing the explanation?
- Can a teacher run a 10-minute lesson with no onboarding assistance?
- Does sending a challenge lead to an actual second person's interaction, rather than merely a shared image?

## Build order

1. Film and observe five people trying the existing mobile v4.1: document confusion and performance.
2. Prototype one *extremely polished* Magnet Dance onboarding flow, not all eight exhibits at once.
3. Add Guess the Field and one-tap 'send this experiment'.
4. Test with a small group including a science educator and adjust accessibility/physics copy.
5. Only then expand the collection and build Teacher mode.

**Definition of done:** It feels magical, remains scientifically honest, runs smoothly on ordinary phones, and helps another person understand something real.
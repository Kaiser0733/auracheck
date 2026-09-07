Night-window artwork release

- Use the supplied diptych's clean right panel, cropped beyond the center divider, as local assets/night-window.webp. Preserve original source outside the repository untouched.
- Cover-fit without stretching; overlay dark purple for readability. Uniform lavender typography and straight stamp follow the supplied reference while preserving dynamic result text.
- Await artwork loading before rendering or reopening cards. A load failure produces an explicit retry message and does not spend credit. Bundle the background in the offline cache.
- Keep the existing card dimensions, scoring, question rotation and weekly quota.
- Live X11 capture inspected via the available auxiliary image pipeline; do not describe this as native pixel inspection by the main model.

Answer-based results release

- Add two exact, context-labelled selected answers to the share card. Include a contrasting category when present; keep one entertainment line.
- Tied top categories receive Mixed Weather instead of presenting the tie-break winner as a finding.
- Expandable Why this read shows all answered prompts, describes percentage semantics, excludes skips and uses textContent for user-visible data.
- Warn that exported cards contain two answers. No answers are sent to a server by this change.
- Keep old saved payloads readable; no regeneration or extra quota charge on reopening.
- Usability reference: https://www.nngroup.com/articles/recognition-and-recall/ — recognition benefits from visible context. Applying this to result explanation is a design inference, not evidence of improved retention.
- Beta evidence still needed: perceived relevance, comfort sharing answer quotes, and repeat visits. No claim that users necessarily make exactly one card per day.

Question rotation release

- Five questions per check-in; retain eight existing prompts and add twenty today-focused prompts.
- Use a shuffled ID queue rather than independent random picks: fewer repeats, no added dependency.
- Save exact drawn IDs with answers; score against that set, not full-bank positions.
- Starting the name screen does not draw a set. Beginning questions does; going Back does not draw again.
- Owner confirmed three free cards per week as the intended model; keep it. Paid extras remain unavailable until real checkout and server-side entitlement exist.
- Existing saved cards remain available. Pre-rotation drafts are not reinterpreted with new questions.
- New regression tests cover pool size, unique draws, exhaustion, corrupt queue recovery and immutable input. Browser checks cover stable IDs through reload/resume, Back, and different next-session IDs.

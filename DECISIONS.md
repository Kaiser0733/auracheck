Question rotation release

- Five questions per check-in; retain eight existing prompts and add twenty today-focused prompts.
- Use a shuffled ID queue rather than independent random picks: fewer repeats, no added dependency.
- Save exact drawn IDs with answers; score against that set, not full-bank positions.
- Starting the name screen does not draw a set. Beginning questions does; going Back does not draw again.
- Keep existing quota and pricing in this focused release. A daily allowance remains separate work.
- Existing saved cards remain available. Pre-rotation drafts are not reinterpreted with new questions.
- New regression tests cover pool size, unique draws, exhaustion, corrupt queue recovery and immutable input. Browser checks cover stable IDs through reload/resume, Back, and different next-session IDs.

// AuraCheck card templates — dark premium palette, savage-loving, all-gender.
// Payload shape: palette{bg,ink,glow,stamp}, headline, sub, lines[3]

const CARDS = {

  aura: [
    {
      id: "AURA-GOLD",
      headline: "⭐ Main Character, Certified",
      sub: "Aura Count: 100/100 | Trusted for life updates",
      stamp: "AURA CERTIFIED",
      lines: [
        "You carry the room without trying.",
        "People rehearse your captions in their head.",
        "Even your Wi-Fi acts different around you.",
      ],
      palette: { bg:'#0f0d14', ink:'#f5f1ea', glow:'#ffd479', stamp:'#ffd479' },
      tags: ['aura']
    },
    {
      id: "AURA-CEO",
      headline: "Future CEO Vibes Only 🎯",
      sub: "Clean decisions. Zero regret energy.",
      stamp: "AURA CERTIFIED",
      lines: [
        "Your 'noted' scares people.",
        "To-do list actually fears you.",
        "You give 'been dropping game since diaper' vibe.",
      ],
      palette: { bg:'#100e16', ink:'#f0eadf', glow:'#ffb347', stamp:'#ffb347' },
      tags: ['aura']
    },
    {
      id: "AURA-LEGEND",
      headline: "Certified Desi Legend 🏆",
      sub: "Life score: Perfect 10 / it can't be better, literally",
      stamp: "RARE AURA",
      lines: [
        "Post once, comments explain themselves.",
        "The plant grows faster looking at you.",
        "Your group chat trusts your hot take.",
      ],
      palette: { bg:'#0e0d13', ink:'#f2eee6', glow:'#a78bfa', stamp:'#a78bfa' },
      tags: ['aura', 'rare']
    },
  ],

  delulu: [
    {
      id: "DELULU-DEFAULT",
      headline: "Delulu Masterclass ⭐",
      sub: "Reality check: failed, but entertainment value 10/10",
      stamp: "DELULU CERTIFIED",
      lines: [
        "You see patterns in laundry folding.",
        "Sure. That NASA rejection was rigged.",
        "Every day you invent 'what if' like it's wifi.",
      ],
      palette: { bg:'#110d16', ink:'#efece5', glow:'#b9a6ff', stamp:'#b9a6ff' },
      tags: ['delulu']
    },
    {
      id: "DELULU-DRAMA",
      headline: "Drama Coordinator 💅",
      sub: "Aura: heavy. Emotions: available. Peace: pending.",
      stamp: "DELULU SUN",
      lines: [
        "You created 3 sub-plots from one group text.",
        "You have $('character development') DLC installed.",
        "You screenshot fights for 'popcorn research'.",
      ],
      palette: { bg:'#150e18', ink:'#f3eef0', glow:'#ffb1c8', stamp:'#ffb1c8' },
      tags: ['delulu']
    },
    {
      id: "DELULU-ISBELIEVABLE",
      headline: "Certified Suspiciously Delulu ✨",
      sub: "Its not delulu if it's true, the universe has YOUR back (doubt),",
      stamp: "DELULU",
      lines: [
        "You say this is a 'phase' every 3 weeks.",
        "Your 'real' plan is shifting realities daily.",
        "You file taxes on your imagination.",
      ],
      palette: { bg:'#100f15', ink:'#ebe6df', glow:'#ffd48f', stamp:'#ffd48f' },
      tags: ['delulu']
    },
  ],

  toxic: [
    {
      id: "TOXIC-VIBES",
      headline: "Toxic But Productive ☠️",
      sub: "Vibe: razor-sharp. Mood: sharp-ish. Therapy: recommended.",
      stamp: "TOXIC CHECKED",
      lines: [
        "You have 4 ongoing silent wars.",
        "You said 'should we' 97% of conversations.",
        "You escalate politely. That's the scary part.",
      ],
      palette: { bg:'#130f16', ink:'#efe9df', glow:'#ff6b81', stamp:'#ff6b81' },
      tags: ['toxic']
    },
    {
      id: "TOXIC-OBSERVED",
      headline: "Certified. Toxic. Evidence-Based 📋",
      sub: "Ghosts invited you to meetings. That felt personal.",
      stamp: "☠ FILED ON YOUR BEHALF",
      lines: [
        "You dry clean memories before mentioning them.",
        "Snooze pattern? Your calmest moment.",
        "You have a research paper on exes.",
      ],
      palette: { bg:'#110e15', ink:'#f0ece4', glow:'#ff8d6a', stamp:'#ff8d6a' },
      tags: ['toxic']
    },
    {
      id: "TOXIC-GENTLE",
      headline: "Meany Meanie, Certified 😈",
      sub: "Your 'help' is calculated. Non-toxic aura: not found.",
      stamp: "❤ LOVE/HATE — IT'S BOTH",
      lines: [
        "Even your sigh has a sharp flavor.",
        "Everyone talks politely around you, worried.",
        "You take notes during gossip to quote them.",
      ],
      palette: { bg:'#161014', ink:'#f3ede2', glow:'#ff7fa6', stamp:'#ff7fa6' },
      tags: ['toxic']
    },
  ],

  chill: [
    {
      id: "CHILL-LORD",
      headline: "Certified Chill Lord 😌",
      sub: "Emotional damage: 0%. Unbothered: 100%",
      stamp: "SOOTHED",
      lines: [
        "Politicians have less national policy than your views.",
        "You put out fires by napping next to them.",
        "Your shrug is a whole podcast episode.",
      ],
      palette: { bg:'#0e1013', ink:'#eeede6', glow:'#8ad0ff', stamp:'#8ad0ff' },
      tags: ['chill']
    },
    {
      id: "CHILL-ZEN",
      headline: "Zero to Zen Certified 🪷",
      sub: "No drama. No plans. Just breathing.",
      stamp: "ZEN CHECKED",
      lines: [
        "Your 'um, okay' is a trauma-informed response.",
        "You ignore texts like it's a gift they sent you.",
        "Your dramatic pause is actually just nap.",
      ],
      palette: { bg:'#0f1114', ink:'#edece7', glow:'#b0f0cf', stamp:'#b0f0cf' },
      tags: ['chill']
    },
    {
      id: "CHILL-CIVIL",
      headline: "Neutral-Civilian Era ⭐",
      sub: "Emotional inflation: 0.00%. Fault of no one.",
      stamp: "AURA: NEUTRAL",
      lines: [
        "You just listen. Scandal-free since birth.",
        "People overshare to you. That's a compliment.",
        "You ask 'how are we' genuinely, twice.",
      ],
      palette: { bg:'#0e0f14', ink:'#efeee9', glow:'#c2d1ff', stamp:'#c2d1ff' },
      tags: ['chill']
    },
  ],
};

if (typeof module !== 'undefined') module.exports = { CARDS };

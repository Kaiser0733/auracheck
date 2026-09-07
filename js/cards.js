// AuraCheck card templates v2 — universal voice, dark premium palette.
// Savage-but-loving. Shareable-on-sight. No region-lock references.

const CARDS = {

  aura: [
    {
      id: "AURA-GOLD",
      headline: "Main Character, Certified ⭐",
      sub: "Aura: unmistakable | Presence: precedes you",
      stamp: "GOLD AURA",
      lines: [
        "You enter rooms and the air updates itself.",
        "People rehearse captions thinking of your vibe.",
        "Your presence has a notification sound."
      ],
      palette: { bg:'#0f0d14', ink:'#f5f1ea', glow:'#ffd479', stamp:'#ffd479' },
      tags: ['aura']
    },
    {
      id: "AURA-CEO",
      headline: "Runs On CEO Energy 🎯",
      sub: "Decisions: clean. Excuses: zero.",
      stamp: "ELITE TIER",
      lines: [
        "Your 'noted' has ended meetings.",
        "Your to-do list is scared of you.",
        "You've been iconic since before it was a word."
      ],
      palette: { bg:'#100e16', ink:'#f0eadf', glow:'#ffb347', stamp:'#ffb347' },
      tags: ['aura']
    },
    {
      id: "AURA-LEGEND",
      headline: "Certified Flagship Human 🏆",
      sub: "Score: clean 10/10. Recount not required.",
      stamp: "RARE FIND",
      lines: [
        "You post once; the comments write themselves.",
        "Your side-eye has more authority than most speeches.",
        "Plants near you photosynthesize faster. Science pending."
      ],
      palette: { bg:'#0e0d13', ink:'#f2eee6', glow:'#a78bfa', stamp:'#a78bfa' },
      tags: ['aura']
    }
  ],

  delulu: [
    {
      id: "DELULU-TENURE",
      headline: "Dr. Delulu, Tenure Track 🎓",
      sub: "Imagination: rigorous. Facts: optional.",
      stamp: "CERTIFIED DELULU",
      lines: [
        "You've built 6 realities from one 'ok' text.",
        "Your backup plans have backup plans with feelings.",
        "NASA rejected your application — they'll learn."
      ],
      palette: { bg:'#110d16', ink:'#efece5', glow:'#b9a6ff', stamp:'#b9a6ff' },
      tags: ['delulu']
    },
    {
      id: "DELULU-DRAMA",
      headline: "Drama Department Head 💅",
      sub: "Emotions: elaborate. Peace: scheduled for later.",
      stamp: "CINEMA VERIFIED",
      lines: [
        "You turned one group chat into 3 subplots.",
        "Your origin story gets retold at parties.",
        "You screenshot arguments like it's a legal archive."
      ],
      palette: { bg:'#150e18', ink:'#f3eef0', glow:'#ffb1c8', stamp:'#ffb1c8' },
      tags: ['delulu']
    },
    {
      id: "DELULU-3AM",
      headline: "Delulu (Late Night Edition) ✨",
      sub: "Peak performance hours: 2AM–4AM only.",
      stamp: "DELULU",
      lines: [
        "You've announced a new era weekly since 2022.",
        "Your vision board has its own vision board.",
        "'It's a phase' — you, every single month."
      ],
      palette: { bg:'#100f15', ink:'#ebe6df', glow:'#ffd48f', stamp:'#ffd48f' },
      tags: ['delulu']
    }
  ],

  toxic: [
    {
      id: "TOXIC-PRO",
      headline: "Certified Strategist ☠️",
      sub: "Vibe: exactly as dangerous as it looks.",
      stamp: "TOXIC VERIFIED",
      lines: [
        "You maintain 4 ongoing silent wars.",
        "Your politeness is weaponized.",
        "You remember everything. Especially the 'nothing' things."
      ],
      palette: { bg:'#130f16', ink:'#efe9df', glow:'#ff6b81', stamp:'#ff6b81' },
      tags: ['toxic']
    },
    {
      id: "TOXIC-ARCHIVE",
      headline: "Evidence Keeper 📋",
      sub: "Your friendship warranty comes with case files.",
      stamp: "FILED + LOGGED",
      lines: [
        "You dry-clean memories before replaying them.",
        "You've drafted closure texts you'll never send.",
        "You have a receipts folder. It's labeled."
      ],
      palette: { bg:'#110e15', ink:'#f0ece4', glow:'#ff8d6a', stamp:'#ff8d6a' },
      tags: ['toxic']
    },
    {
      id: "TOXIC-GENTLE",
      headline: "Sweet Until Noticed 😈",
      sub: "First impression: warm. Second impression: noted.",
      stamp: "DANGEROUSLY SWEET",
      lines: [
        "Even your 'no worries' has a follow-up.",
        "You take notes. Nobody knows when.",
        "Your silence has better timing than people's speeches."
      ],
      palette: { bg:'#161014', ink:'#f3ede2', glow:'#ff7fa6', stamp:'#ff7fa6' },
      tags: ['toxic']
    }
  ],

  chill: [
    {
      id: "CHILL-LORD",
      headline: "Unbothered. Hydrated. ☁️",
      sub: "Emotional damage: not found. Literally.",
      stamp: "SERENE",
      lines: [
        "You nap next to storms.",
        "Your 'ok' ends conversations that started an hour ago.",
        "People confess things to you for no reason."
      ],
      palette: { bg:'#0e1013', ink:'#eeede6', glow:'#8ad0ff', stamp:'#8ad0ff' },
      tags: ['chill']
    },
    {
      id: "CHILL-ZEN",
      headline: "Zen Mode: Permanent 🪷",
      sub: "No drama. No rush. Some snacks.",
      stamp: "AT PEACE",
      lines: [
        "You watch chaos like it's a nature documentary.",
        "Your eye contact is a breathing exercise.",
        "You've never opened a trending hashtag."
      ],
      palette: { bg:'#0f1114', ink:'#edece7', glow:'#b0f0cf', stamp:'#b0f0cf' },
      tags: ['chill']
    },
    {
      id: "CHILL-BASE",
      headline: "Baseline Human (Premium) ⭐",
      sub: "Remains unproblematic at scale.",
      stamp: "NEUTRAL GOOD",
      lines: [
        "You've never been in a group chat war. Somehow.",
        "People tell you things they haven't told their therapist.",
        "Your aura hums like a fridge — always on, rarely noticed."
      ],
      palette: { bg:'#0e0f14', ink:'#efeee9', glow:'#c2d1ff', stamp:'#c2d1ff' },
      tags: ['chill']
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { CARDS };

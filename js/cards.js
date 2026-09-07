// Playful snapshots of today, not permanent character judgments.
const CARDS = {
  "aura": [
    {
      "id": "AURA-GOLD",
      "headline": "Good Form Today",
      "sub": "Today: a little more sure of yourself.",
      "stamp": "IN YOUR STRIDE",
      "lines": [
        "Today’s doubt got left on read.",
        "Your next step looks less intimidating.",
        "A small win still gets a victory lap."
      ],
      "palette": {
        "bg": "#0f0d14",
        "ink": "#f5f1ea",
        "glow": "#ffd479",
        "stamp": "#ffd479"
      },
      "tags": [
        "aura"
      ]
    },
    {
      "id": "AURA-CEO",
      "headline": "Taking The Lead",
      "sub": "Today: ready to make a start.",
      "stamp": "MOMENTUM",
      "lines": [
        "The first step finally has company.",
        "Today’s to-do list looks mildly nervous.",
        "Keep a little credit for yourself."
      ],
      "palette": {
        "bg": "#100e16",
        "ink": "#f0eadf",
        "glow": "#ffb347",
        "stamp": "#ffb347"
      },
      "tags": [
        "aura"
      ]
    },
    {
      "id": "AURA-LEGEND",
      "headline": "Quietly Nailing It",
      "sub": "Today: confidence without the announcement.",
      "stamp": "SOLID DAY",
      "lines": [
        "Today’s effort deserves a mention.",
        "No acceptance speech required.",
        "A good moment can stay a good moment."
      ],
      "palette": {
        "bg": "#0e0d13",
        "ink": "#f2eee6",
        "glow": "#a78bfa",
        "stamp": "#a78bfa"
      },
      "tags": [
        "aura"
      ]
    }
  ],
  "delulu": [
    {
      "id": "DELULU-TENURE",
      "headline": "Mind On A Detour",
      "sub": "Today: plenty happening in your head.",
      "stamp": "MENTAL SIDE QUEST",
      "lines": [
        "Today’s thoughts opened extra tabs.",
        "One possibility grew a whole subplot.",
        "The director’s cut can wait."
      ],
      "palette": {
        "bg": "#110d16",
        "ink": "#efece5",
        "glow": "#b9a6ff",
        "stamp": "#b9a6ff"
      },
      "tags": [
        "delulu"
      ]
    },
    {
      "id": "DELULU-DRAMA",
      "headline": "Plot In Progress",
      "sub": "Today: your imagination has been busy.",
      "stamp": "STORY MODE",
      "lines": [
        "Today’s maybe arrived with sequels.",
        "Your brain brought its own screenwriter.",
        "No need to finish every storyline."
      ],
      "palette": {
        "bg": "#150e18",
        "ink": "#f3eef0",
        "glow": "#ffb1c8",
        "stamp": "#ffb1c8"
      },
      "tags": [
        "delulu"
      ]
    },
    {
      "id": "DELULU-3AM",
      "headline": "Several Tabs Open",
      "sub": "Today: attention taking the scenic route.",
      "stamp": "WANDERING MIND",
      "lines": [
        "One thought invited five friends.",
        "Today’s plans have bonus scenes.",
        "You can leave a few tabs unanswered."
      ],
      "palette": {
        "bg": "#100f15",
        "ink": "#ebe6df",
        "glow": "#ffd48f",
        "stamp": "#ffd48f"
      },
      "tags": [
        "delulu"
      ]
    }
  ],
  "toxic": [
    {
      "id": "TOXIC-PRO",
      "headline": "Patience On Low",
      "sub": "Today: a shorter fuse than you wanted.",
      "stamp": "PRICKLY TODAY",
      "lines": [
        "Today’s small annoyances got loud.",
        "Your patience requested a lunch break.",
        "A prickly day is allowed to end."
      ],
      "palette": {
        "bg": "#130f16",
        "ink": "#efe9df",
        "glow": "#ff6b81",
        "stamp": "#ff6b81"
      },
      "tags": [
        "toxic"
      ]
    },
    {
      "id": "TOXIC-ARCHIVE",
      "headline": "Noted. Today Only.",
      "sub": "Today: something got under your skin.",
      "stamp": "FILED + LOGGED",
      "lines": [
        "Today’s annoyance got a case number.",
        "Your inner complaint desk stayed open.",
        "The file does not need a sequel."
      ],
      "palette": {
        "bg": "#110e15",
        "ink": "#f0ece4",
        "glow": "#ff8d6a",
        "stamp": "#ff8d6a"
      },
      "tags": [
        "toxic"
      ]
    },
    {
      "id": "TOXIC-GENTLE",
      "headline": "Do Not Disturb",
      "sub": "Today: less room for extra demands.",
      "stamp": "NEEDS SOME SPACE",
      "lines": [
        "Today’s patience has office hours.",
        "Extra nonsense missed the deadline.",
        "Tomorrow does not inherit this mood."
      ],
      "palette": {
        "bg": "#161014",
        "ink": "#f3ede2",
        "glow": "#ff7fa6",
        "stamp": "#ff7fa6"
      },
      "tags": [
        "toxic"
      ]
    }
  ],
  "chill": [
    {
      "id": "CHILL-LORD",
      "headline": "Taking It Easy",
      "sub": "Today: a little less hurry.",
      "stamp": "SLOW LANE",
      "lines": [
        "Today can move without a countdown.",
        "A quiet moment made the shortlist.",
        "No bonus points for unnecessary stress."
      ],
      "palette": {
        "bg": "#0e1013",
        "ink": "#eeede6",
        "glow": "#8ad0ff",
        "stamp": "#8ad0ff"
      },
      "tags": [
        "chill"
      ]
    },
    {
      "id": "CHILL-ZEN",
      "headline": "Peace For Now",
      "sub": "Today: comfortable with a gentler pace.",
      "stamp": "AT EASE",
      "lines": [
        "Today’s rush can go on without you.",
        "Your pause needs no presentation.",
        "A little breathing room counts."
      ],
      "palette": {
        "bg": "#0f1114",
        "ink": "#edece7",
        "glow": "#b0f0cf",
        "stamp": "#b0f0cf"
      },
      "tags": [
        "chill"
      ]
    },
    {
      "id": "CHILL-BASE",
      "headline": "Low-Key Today",
      "sub": "Today: keeping things simple.",
      "stamp": "NO BIG PRODUCTION",
      "lines": [
        "Today did not need a dramatic trailer.",
        "Small comforts made the guest list.",
        "A low-key day still belongs on record."
      ],
      "palette": {
        "bg": "#0e0f14",
        "ink": "#efeee9",
        "glow": "#c2d1ff",
        "stamp": "#c2d1ff"
      },
      "tags": [
        "chill"
      ]
    }
  ]
};
if(typeof module!=="undefined") module.exports={CARDS};

// Today-only entertainment check-in. Skip adds no points; these are not clinical scales.
const QUIZ = [
  {
    "id": 1,
    "text": "Which feeling has shown up most today?",
    "options": [
      {
        "text": "Confident. I feel good about myself.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "Preoccupied. My mind keeps wandering.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "Irritated. Little things are getting to me.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "Settled. I feel fairly at ease.",
        "weights": {
          "chill": 10
        }
      }
    ]
  },
  {
    "id": 2,
    "text": "How does your energy feel right now?",
    "options": [
      {
        "text": "Restless, with thoughts going everywhere.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "Wound up and finding it hard to relax.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "Quiet. I want a slower pace.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "Ready to get into something.",
        "weights": {
          "aura": 10
        }
      }
    ]
  },
  {
    "id": 3,
    "text": "Where has your attention gone today?",
    "options": [
      {
        "text": "Back to something that annoyed me.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "Into simple things, without much overthinking.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "Into what I was doing.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "Into imagined conversations or future plans.",
        "weights": {
          "delulu": 10
        }
      }
    ]
  },
  {
    "id": 4,
    "text": "How have conversations felt today, online or in person?",
    "options": [
      {
        "text": "Easy enough. I felt no pressure to impress.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "I felt comfortable saying what I meant.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "I kept wondering what someone meant.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "I felt impatient or easily annoyed.",
        "weights": {
          "toxic": 10
        }
      }
    ]
  },
  {
    "id": 5,
    "text": "How has your patience been today?",
    "options": [
      {
        "text": "I could deal with things directly.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "Waiting left me guessing what might happen.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "Thin. Even small delays bothered me.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "I was comfortable letting things take time.",
        "weights": {
          "chill": 10
        }
      }
    ]
  },
  {
    "id": 6,
    "text": "What best describes your pace today so far?",
    "options": [
      {
        "text": "I spent more time imagining than starting.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "Frustration kept interrupting what I was doing.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "I took things slowly and was okay with that.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "I got started on something I wanted to do.",
        "weights": {
          "aura": 10
        }
      }
    ]
  },
  {
    "id": 7,
    "text": "What kind of moment has stuck with you today?",
    "options": [
      {
        "text": "An annoyance I kept coming back to.",
        "weights": {
          "toxic": 10
        }
      },
      {
        "text": "A quiet moment I enjoyed.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "A small win or something I felt proud of.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "A possibility I kept building up in my head.",
        "weights": {
          "delulu": 10
        }
      }
    ]
  },
  {
    "id": 8,
    "text": "How do you feel about the rest of today right now?",
    "options": [
      {
        "text": "I am happy to take it as it comes.",
        "weights": {
          "chill": 10
        }
      },
      {
        "text": "I feel able to handle what comes next.",
        "weights": {
          "aura": 10
        }
      },
      {
        "text": "I keep picturing different ways it could go.",
        "weights": {
          "delulu": 10
        }
      },
      {
        "text": "I feel fed up and want fewer demands.",
        "weights": {
          "toxic": 10
        }
      }
    ]
  }
];
const TRAITS=["aura", "delulu", "toxic", "chill"];
if(typeof module!=="undefined") module.exports={QUIZ,TRAITS};

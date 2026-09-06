// AuraCheck quiz — dark premium voice, english desi-sprinkle, savage-but-loving.
// Each option weights: {aura (good), delulu, toxic, chill} for scoring. Weights sum to 10.

const QUIZ = [
  {
    id: 1,
    text: "It's 3 AM. What are you actually doing?",
    options: [
      { text: "Re-reading old chats, finding new meaning", weights: { delulu: 6, chill: 4 } },
      { text: "Me and my 'kyun bataya nahi' theories", weights: { toxic: 6, delulu: 4 } },
      { text: "Actually grinding/study for once", weights: { aura: 6, chill: 4 } },
      { text: "Asleep like a normal human", weights: { chill: 10 } }
    ]
  },
  {
    id: 2,
    text: "Friend didn't reply to your 'happy birthday' post. Thoughts?",
    options: [
      { text: "Cool, they wished me in March 2023", weights: { chill: 9, delulu: 1 } },
      { text: "Saving that energy for their wedding", weights: { aura: 5, toxic: 5 } },
      { text: "Creating scenarios where they're sorry", weights: { delulu: 8, chill: 2 } },
      { text: "WTF? We fighting now", weights: { toxic: 8, chill: 2 } }
    ]
  },
  {
    id: 3,
    text: "How do you enter a room of people you know?",
    options: [
      { text: "Walk in, wave, own it", weights: { aura: 10 } },
      { text: "...okay you're looking at the floor", weights: { delulu: 10, chill: 0 } }, // space curse
      { text: "Greet with a loud 'are yaar!' and hugs", weights: { chill: 6, aura: 4 } },
      { text: "Enter silently. Ninja mode", weights: { toxic: 7, chill: 3 } }
    ]
  },
  {
    id: 4,
    text: "Someone roasts you in public. Your response:",
    options: [
      { text: "'lol true' — unbothered, but filing it away", weights: { chill: 5, toxic: 5 } },
      { text: "Crying/elegant laugh combo", weights: { delulu: 8, chill: 2 } },
      { text: "I fix it myself in front of everyone", weights: { aura: 8, chill: 2 } },
      { text: "Double the roast back, cold stare", weights: { toxic: 7, aura: 3 } }
    ]
  },
  {
    id: 5,
    text: "Your Spotify/Aura report says 'resilient'. Your reaction:",
    options: [
      { text: "Resilient? I'd call it crippled", weights: { delulu: 9, chill: 1 } },
      { text: "Screenshot. Frame it", weights: { aura: 8, delulu: 2 } },
      { text: "Haven't opened it in a month", weights: { chill: 7, delulu: 3 } },
      { text: "Ye app ne convince kar liya", weights: { toxic: 6, chill: 4 } }
    ]
  },
  {
    id: 6,
    text: "It's midnight, craving kicks in. You:",
    options: [
      { text: "Make them INSTANTLY, share stories", weights: { aura: 6, chill: 4 } },
      { text: "Mummi ne nashta rokta hai", weights: { delulu: 6, chill: 4 } },
      { text: "Ghost floor and stare at fridge", weights: { toxic: 5, chill: 5 } },
      { text: "Dial it myself. Legend", weights: { aura: 10, chill: 0 } }
    ]
  },
];

// Archetype lookup table
const TRAITS = ['aura', 'delulu', 'toxic', 'chill'];

if (typeof module !== 'undefined') module.exports = { QUIZ, TRAITS };

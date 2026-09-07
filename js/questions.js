// AuraCheck quiz v2 — rewritten after LO feedback.
// Voice: English with desi sprinkles. Savage-loving. All-gender neutral.
// Rule: every option must be a CONCRETE situation a real person would pick,
// not a generic personality-test answer. Weights sum to 10 per option.
// Traits: aura / delulu / toxic / chill

const QUIZ = [
  {
    id: 1,
    text: "They viewed your story but didn't reply to your message. You:",
    options: [
      { text: "Post an extra-aesthetic story within the hour. Checkmate.", weights: { toxic: 4, delulu: 4, aura: 2 } },
      { text: "Re-read my own message 6 times. maybe 'lol' was too much.", weights: { delulu: 8, chill: 2 } },
      { text: "Screenshot for the gc: 'am I overthinking' (I am)", weights: { toxic: 6, delulu: 2, chill: 2 } },
      { text: "Genuinely forgot I texted them until just now", weights: { chill: 9, aura: 1 } }
    ]
  },
  {
    id: 2,
    text: "It's 3 AM. The honest truth of your screen:",
    options: [
      { text: "Instagram reels → 5s skip → repeat × 200", weights: { delulu: 6, chill: 4 } },
      { text: "Watching a 20-min video essay about a show I've never seen", weights: { aura: 3, delulu: 3, chill: 4 } },
      { text: "'Kal se productive era.' I say this nightly since 2023", weights: { delulu: 7, chill: 3 } },
      { text: "Actually asleep because I have shame-free discipline", weights: { aura: 8, chill: 2 } }
    ]
  },
  {
    id: 3,
    text: "Someone in the group chat sends a corny meme. You:",
    options: [
      { text: "Leave them on seen. Silence is the review.", weights: { toxic: 8, aura: 2 } },
      { text: "'💀💀💀' — even if it wasn't funny, diplomacy", weights: { chill: 6, delulu: 2, aura: 2 } },
      { text: "Send a BETTER meme immediately to fix the vibe", weights: { aura: 7, chill: 3 } },
      { text: "Screenshot it to cringe-discuss on another gc", weights: { toxic: 9, chill: 1 } }
    ]
  },
  {
    id: 4,
    text: "Your convince-myself-to-buy-it process:",
    options: [
      { text: "UPI balance screenshot → 'I deserve this' → ordered", weights: { delulu: 8, toxic: 2 } },
      { text: "7 open tabs, price-compare, reviews at 2 AM", weights: { aura: 6, chill: 4 } },
      { text: "Add to cart. Close app. Re-add. Repeat monthly.", weights: { delulu: 7, chill: 3 } },
      { text: "Das ki budget hi nahi hai, so I just fantasize", weights: { chill: 8, delulu: 2 } }
    ]
  },
  {
    id: 5,
    text: "Somebody insults you nicely (the 'I'm just saying' type). You:",
    options: [
      { text: "Smile. File it. Deploy it 4 months later at the perfect moment", weights: { toxic: 9, aura: 1 } },
      { text: "Instant comeback, respectfully unhinged", weights: { aura: 7, toxic: 3 } },
      { text: "Spend the next 2 hours making it a character arc", weights: { delulu: 8, chill: 2 } },
      { text: "Genuinely didn't register until someone explained it to me", weights: { chill: 9, delulu: 1 } }
    ]
  },
  {
    id: 6,
    text: "Your camera roll right now is mostly:",
    options: [
      { text: "Screenshots of texts, as admissible evidence", weights: { toxic: 8, delulu: 2 } },
      { text: "0 selfie, 14 sky photos nobody asked for", weights: { chill: 8, delulu: 2 } },
      { text: "Outfit checks I never posted (bridging to Lunar New Year era)", weights: { delulu: 9, aura: 1 } },
      { text: "Notes app screenshots of fake scenarios", weights: { delulu: 6, toxic: 4 } }
    ]
  },
  {
    id: 7,
    text: "How do you see yourself at family functions?",
    options: [
      { text: "The aesthetic one — I bring the good outfits AND the gossip", weights: { aura: 8, chill: 2 } },
      { text: "Phone > relatives. Consistent since 2019", weights: { chill: 7, toxic: 3 } },
      { text: "Stretching one 'aur batao' conversation for 40 minutes", weights: { chill: 6, aura: 4 } },
      { text: "Charging my phone in the farthest room. De dene waala", weights: { delulu: 6, toxic: 4 } }
    ]
  },
  {
    id: 8,
    text: "Your current life chapter, honestly:",
    options: [
      { text: "Main-character era. Loud and booked", weights: { aura: 10 } },
      { text: "Plotting. Offline. Something big cooking", weights: { toxic: 5, chill: 5 } },
      { text: "Rock bottom but make it a meme ✨", weights: { delulu: 9, chill: 1 } },
      { text: "Peacefully irrelevant. Vibes", weights: { chill: 10 } }
    ]
  }
];

const TRAITS = ['aura', 'delulu', 'toxic', 'chill'];

if (typeof module !== 'undefined') module.exports = { QUIZ, TRAITS };

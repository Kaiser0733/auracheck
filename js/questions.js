// Today-only entertainment prompts. Skip is always available.
const QUIZ = [
 {
  "id": 1,
  "topic": "Feeling",
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
  "topic": "Energy",
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
  "topic": "Attention",
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
  "topic": "Conversations",
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
  "topic": "Patience",
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
  "topic": "Pace",
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
  "topic": "Standout moment",
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
  "topic": "Outlook",
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
 },
 {
  "id": 9,
  "topic": "Waking up",
  "text": "How did getting out of bed feel today?",
  "options": [
   {
    "text": "Ready to begin.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "My thoughts were already racing ahead.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I was annoyed at having to get up.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I eased into being awake.",
    "weights": {
     "chill": 10
    }
   }
  ]
 },
 {
  "id": 10,
  "topic": "Phone",
  "text": "How has your phone affected your mood today?",
  "options": [
   {
    "text": "I kept checking for something new.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "What I saw left me irritated.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I could put it down without much fuss.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Something on it gave me a boost.",
    "weights": {
     "aura": 10
    }
   }
  ]
 },
 {
  "id": 11,
  "topic": "Spare moment",
  "text": "What happened when you had a spare moment today?",
  "options": [
   {
    "text": "I replayed something frustrating.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I enjoyed doing very little.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I used it for something I wanted.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "My mind drifted into a daydream.",
    "weights": {
     "delulu": 10
    }
   }
  ]
 },
 {
  "id": 12,
  "topic": "First task",
  "text": "How did your first task feel today?",
  "options": [
   {
    "text": "Something I could take my time with.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Manageable once I started.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Hard to focus on with so much in my head.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "More aggravating than I expected.",
    "weights": {
     "toxic": 10
    }
   }
  ]
 },
 {
  "id": 13,
  "topic": "Self-talk",
  "text": "How have you felt about yourself today?",
  "options": [
   {
    "text": "Pleased with something I did.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Unsure, and thinking about it a lot.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "Frustrated with myself.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "Okay without needing a big achievement.",
    "weights": {
     "chill": 10
    }
   }
  ]
 },
 {
  "id": 14,
  "topic": "Changed plans",
  "text": "How did a change of plan land today?",
  "options": [
   {
    "text": "I started imagining all the knock-on effects.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "It really got on my nerves.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I was fine adjusting the pace.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I found another way forward.",
    "weights": {
     "aura": 10
    }
   }
  ]
 },
 {
  "id": 15,
  "topic": "After talking",
  "text": "How did you feel after your latest conversation today?",
  "options": [
   {
    "text": "More irritated than before.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "Relaxed enough to move on.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Glad I spoke up.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Still decoding parts of it.",
    "weights": {
     "delulu": 10
    }
   }
  ]
 },
 {
  "id": 16,
  "topic": "Inner voice",
  "text": "What has your inner voice sounded like today?",
  "options": [
   {
    "text": "Giving me room to breathe.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Encouraging me to try.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Asking one what-if after another.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "Complaining about everything.",
    "weights": {
     "toxic": 10
    }
   }
  ]
 },
 {
  "id": 17,
  "topic": "Decisions",
  "text": "How did you handle a small decision today?",
  "options": [
   {
    "text": "Picked something and went with it.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Kept picturing the other choices.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "Got frustrated that I had to choose.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "Took my time without much pressure.",
    "weights": {
     "chill": 10
    }
   }
  ]
 },
 {
  "id": 18,
  "topic": "Noise",
  "text": "How has your surroundings’ noise felt today?",
  "options": [
   {
    "text": "It kept pulling my thoughts elsewhere.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "Even little sounds annoyed me.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I felt comfortable in the space I had.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Easy enough to tune out and carry on.",
    "weights": {
     "aura": 10
    }
   }
  ]
 },
 {
  "id": 19,
  "topic": "Waiting",
  "text": "How did waiting for something feel today?",
  "options": [
   {
    "text": "It tested every bit of my patience.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I could leave it alone for a while.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I found something else useful to do.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "I kept guessing how it would turn out.",
    "weights": {
     "delulu": 10
    }
   }
  ]
 },
 {
  "id": 20,
  "topic": "Social updates",
  "text": "How has looking at other people’s updates felt today?",
  "options": [
   {
    "text": "I could look and move on.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I felt encouraged to do my own thing.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "I imagined how my life could look like theirs.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I found myself getting annoyed or comparing.",
    "weights": {
     "toxic": 10
    }
   }
  ]
 },
 {
  "id": 21,
  "topic": "Setbacks",
  "text": "How did a mistake or setback affect you today?",
  "options": [
   {
    "text": "I felt able to try again.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "I kept replaying how it might have gone.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "It put me in a bad mood.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I could accept it and slow down.",
    "weights": {
     "chill": 10
    }
   }
  ]
 },
 {
  "id": 22,
  "topic": "Breaks",
  "text": "How have breaks felt today?",
  "options": [
   {
    "text": "My head stayed busy with possibilities.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I was too wound up to enjoy them.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I could actually settle into them.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "They helped me return with some confidence.",
    "weights": {
     "aura": 10
    }
   }
  ]
 },
 {
  "id": 23,
  "topic": "Being noticed",
  "text": "How did you feel about being noticed today?",
  "options": [
   {
    "text": "The attention felt irritating.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I felt fine staying low-key.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "Comfortable being seen or heard.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "I wondered what people were thinking of me.",
    "weights": {
     "delulu": 10
    }
   }
  ]
 },
 {
  "id": 24,
  "topic": "Unfinished tasks",
  "text": "How has unfinished stuff felt today?",
  "options": [
   {
    "text": "I could leave some of it for later.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I could pick a next step.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "It kept turning into a bigger story in my head.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "It made me grumpy.",
    "weights": {
     "toxic": 10
    }
   }
  ]
 },
 {
  "id": 25,
  "topic": "Ideas",
  "text": "What happened when you had an idea today?",
  "options": [
   {
    "text": "I felt like giving it a try.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "I imagined the whole thing in detail.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I got frustrated by what was in the way.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "I let it sit without needing to act.",
    "weights": {
     "chill": 10
    }
   }
  ]
 },
 {
  "id": 26,
  "topic": "Time alone",
  "text": "How has being alone felt today?",
  "options": [
   {
    "text": "My mind filled the silence with scenarios.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I felt restless and annoyed.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "It gave me a welcome bit of quiet.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I enjoyed having room to do my thing.",
    "weights": {
     "aura": 10
    }
   }
  ]
 },
 {
  "id": 27,
  "topic": "Food and drink",
  "text": "How did you feel after eating or drinking something today?",
  "options": [
   {
    "text": "Still easily bothered by things.",
    "weights": {
     "toxic": 10
    }
   },
   {
    "text": "Content to sit for a moment.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "A little more ready to get going.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "Still distracted by what was on my mind.",
    "weights": {
     "delulu": 10
    }
   }
  ]
 },
 {
  "id": 28,
  "topic": "Right now",
  "text": "Which feeling fits this check-in right now?",
  "options": [
   {
    "text": "I feel at ease.",
    "weights": {
     "chill": 10
    }
   },
   {
    "text": "I feel capable.",
    "weights": {
     "aura": 10
    }
   },
   {
    "text": "My head is full of possibilities.",
    "weights": {
     "delulu": 10
    }
   },
   {
    "text": "I feel easily annoyed.",
    "weights": {
     "toxic": 10
    }
   }
  ]
 }
];
const TRAITS=["aura", "delulu", "toxic", "chill"];

const Rotation = {
 next(saved, random = Math.random) {
  const all=QUIZ.map(q=>q.id);
  let remaining=Array.isArray(saved)?[...new Set(saved.filter(id=>all.includes(id)))]:[];
  const ids=[];
  while(ids.length<5){
   if(!remaining.length){
    const fresh=[...all];
    for(let i=fresh.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[fresh[i],fresh[j]]=[fresh[j],fresh[i]];}
    // At a cycle boundary, postpone IDs already in this check-in.
    remaining=[...fresh.filter(id=>!ids.includes(id)),...fresh.filter(id=>ids.includes(id))];
   }
   ids.push(remaining.shift());
  }
  return {ids,remaining};
 }
};
if(typeof module!=='undefined') module.exports={QUIZ,TRAITS,Rotation};

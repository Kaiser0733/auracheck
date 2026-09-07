// Entertainment categories, not a validated psychological instrument.
// Plain answers first; the result card carries the joke. Skip is always available.
const QUIZ = [
 {id:1,text:"A message you sent yesterday still has no reply. What do you usually do?",options:[
  {text:"Send one follow-up if I need an answer.",weights:{aura:7,chill:3}},
  {text:"Check the chat again and wonder what I said.",weights:{delulu:8,chill:2}},
  {text:"Decide they can wait for my next reply too.",weights:{toxic:8,delulu:2}},
  {text:"Leave it alone and get on with my day.",weights:{chill:9,aura:1}}]},
 {id:2,text:"You get an unexpected hour to yourself. Your first choice?",options:[
  {text:"Open an app and see where the scroll takes me.",weights:{chill:6,delulu:4}},
  {text:"Watch or read something I've been curious about.",weights:{aura:3,delulu:3,chill:4}},
  {text:"Start planning something I want to do.",weights:{delulu:6,aura:4}},
  {text:"Rest. No need to turn it into a project.",weights:{chill:10}}]},
 {id:3,text:"Your friends can't decide what to do together. What role do you take?",options:[
  {text:"Suggest a plan and sort out the details.",weights:{aura:10}},
  {text:"Pick a favorite and try to get everyone on board.",weights:{aura:5,toxic:5}},
  {text:"Offer more ideas. Possibly too many.",weights:{delulu:8,aura:2}},
  {text:"Go with the group. I'm there for the company.",weights:{chill:10}}]},
 {id:4,text:"Something you want costs more than you planned to spend. What happens next?",options:[
  {text:"Buy it anyway if I can cover the essentials.",weights:{delulu:8,aura:2}},
  {text:"Compare alternatives before deciding.",weights:{aura:6,chill:4}},
  {text:"Save it and keep thinking about it.",weights:{delulu:7,chill:3}},
  {text:"Pass for now. The budget wins.",weights:{chill:8,aura:2}}]},
 {id:5,text:"A friend makes a joke about you that goes too far. Your usual response?",options:[
  {text:"Say directly that it bothered me.",weights:{aura:8,chill:2}},
  {text:"Make a sharper joke back.",weights:{toxic:8,aura:2}},
  {text:"Laugh along, then replay it later.",weights:{delulu:8,chill:2}},
  {text:"Let it go unless it happens again.",weights:{chill:8,aura:2}}]},
 {id:6,text:"You have news you're excited about. Who hears first?",options:[
  {text:"Everyone. I'm ready to announce it.",weights:{aura:10}},
  {text:"One close person, with every tiny detail.",weights:{delulu:6,chill:4}},
  {text:"A few people after I've decided how to tell it.",weights:{toxic:5,aura:5}},
  {text:"Nobody yet. I enjoy it privately first.",weights:{chill:10}}]},
 {id:7,text:"At a gathering where you know one person, what do you usually do first?",options:[
  {text:"Introduce myself to someone new.",weights:{aura:10}},
  {text:"Stay with the person I know until I settle in.",weights:{chill:8,delulu:2}},
  {text:"Look around and choose a conversation to join.",weights:{aura:4,toxic:4,chill:2}},
  {text:"Find a quieter spot and take it slowly.",weights:{chill:7,delulu:3}}]},
 {id:8,text:"Which best describes how you make plans lately?",options:[
  {text:"Choose something and actually put it on the calendar.",weights:{aura:10}},
  {text:"Keep the details to myself until I'm ready.",weights:{toxic:5,chill:5}},
  {text:"Imagine several futures before choosing one.",weights:{delulu:9,chill:1}},
  {text:"Leave room to decide when the day arrives.",weights:{chill:10}}]}
];
const TRAITS=['aura','delulu','toxic','chill'];
if(typeof module!=='undefined') module.exports={QUIZ,TRAITS};

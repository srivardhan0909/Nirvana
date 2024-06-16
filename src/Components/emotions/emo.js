// emotions.js
import happy_kid from './Assets/happy_kid1.jpg';
import sad from './Assets/Sad.jpg';
import excited from './Assets/excited.jpg';
import surprised from './Assets/surprised.jpg'
import crying from './Assets/crying.jpg';
import calm from './Assets/calm.jpg';
import laughing from './Assets/laughing.jpg';
import angry from './Assets/Angry.jpg';
import sleepy from './Assets/sleepy.jpg';
import playful from './Assets/playful.jpg';
import hungry from './Assets/hungry.jpg';
import scared from './Assets/scared.jpg';
import confused from './Assets/confused.jpg';
import silly from './Assets/silly.jpg';
import proud from './Assets/proud.jpg';
import shy from './Assets/shy.jpg';
import curious from './Assets/curious.jpg';
import dancing from './Assets/dancing.jpg';
import fear from './Assets/fear.jpg';
import disgust from './Assets/disgust.jpg';
import smart from './Assets/smart.jpg';
import approval from './Assets/approval.jpg';
import enthusiasm from './Assets/enthusiasm.jpg';
import embarrassment from './Assets/embarrased.jpg';
import pride from './Assets/pride1.jpg';
import anxiety from './Assets/anxiety.jpg';
import lonely from './Assets/lonely.jpg';
import love from './Assets/love.jpg';
import jealosy from './Assets/jealosy.jpg';
import pity from './Assets/pity.jpg';
import relief from './Assets/relief.jpg';
import respect from './Assets/respect.png';
import shame from './Assets/shame.jpg';
import contentment from './Assets/contentment.jpg';
import boredom from './Assets/bored.jpg';
import guilt from './Assets/guilt.jpg';
import frustration from './Assets/frustration.jpg';
import empathy from './Assets/empathy.jpg';
import skepticism from './Assets/skeptism.jpg';
import trust from './Assets/trust.png';
import worry from './Assets/worry.jpg';
import hope from './Assets/hope.jpg';
import satisfaction from './Assets/satisfaction.jpg';
import compassion from './Assets/compassion.jpg';
import despair from './Assets/despair.jpg';
import optimism from './Assets/optimism.jpg';
import sympathy from './Assets/sympathy.jpg';
import regret from './Assets/regret.jpg';
import comfort from './Assets/comfort.jpg';

const emotionsData = {
    "0-4": {
        "easy": [
          { name: 'Happy', image: happy_kid },
          { name: 'Sad', image: sad },
          { name: 'Excited', image: excited },
          { name: 'Calm', image: calm },
          { name: 'Surprised', image: surprised },
          { name: 'Crying', image: crying },
        ],
        "medium": [
          { name: 'Laughing', image: laughing },
          { name: 'Angry', image: angry },
          { name: 'Sleepy', image: sleepy },
          { name: 'Playful', image: playful },
          { name: 'Hungry', image: hungry },
          { name: 'Scared', image: scared },
        ],
        "hard": [
          { name: 'Confused', image: confused },
          { name: 'Silly', image: silly },
          { name: 'Proud', image: proud },
          { name: 'Shy', image: shy },
          { name: 'Curious', image: curious },
          { name: 'Dancing', image: dancing },
        ],
    },
    "5-8": {
        "easy": [
          { name: 'Happy', image: happy_kid },
          { name: 'Sad', image: sad },
          { name: 'Excited', image: excited },
          { name: 'Calm', image: calm },
          { name: 'Surprised', image: surprised },
          { name: 'crying', image: crying },
        ],
        "medium": [
          { name: 'Laughing', image: laughing },
          { name: 'Angry', image: angry },
          { name: 'Sleepy', image: sleepy },
          { name: 'Playful', image: playful },
          { name: 'Hungry', image: hungry },
          { name: 'Scared', image: scared },
        ],
        "hard": [
          { name: 'Confused', image: confused },
          { name: 'Proud', image: proud },
          { name: 'Shy', image: shy },
          { name: 'Curious', image: curious },
          { name: 'Dancing', image: dancing },
          { name: 'fear', image: fear },
        ],
    },
    "8-10": {
        "easy": [
          { name: 'Happy', image: happy_kid },
          { name: 'Sad', image: sad },
          { name: 'Excited', image: excited },
          { name: 'Calm', image: calm },
          { name: 'Surprised', image: surprised },
          { name: 'crying', image: crying },
          { name: 'Laughing', image: laughing },
          { name: 'Angry', image: angry },
          { name: 'Sleepy', image: sleepy },
          { name: 'Playful', image: playful },
          {name: 'fear', image: fear},
          {name:'disgust', image: disgust },
        ],
        "medium": [
          { name: 'Hungry', image: hungry },
          { name: 'Scared', image: scared },
          { name: 'Confused', image: confused },
          { name: 'Proud', image: proud },
          { name: 'Shy', image: shy },
          { name: 'Curious', image: curious },
          { name: 'Dancing', image: dancing },
          { name: 'Smart', image: smart },
          { name: 'Approval', image: approval },
          {name: 'fear', image: fear},
          {name:'disgust', image: disgust },
          {name:'Enthusiasm', image: enthusiasm},
          {name: 'Embarrassment', image: embarrassment},
          {name: 'Pride', image: pride}
        ],
        "hard": [
          {name: 'Anxiety', image: anxiety},
          {name: 'Excitement', image: excited},
          {name: 'Jealosy', image: jealosy },
          {name: 'Loneliness', image: lonely },
          {name: 'Love', image: love},
          {name: 'Pity', image: pity},
          {name: 'Relief', image: relief },
          {name: 'Respect', image: respect },
          {name: 'Shame', image: shame},
          {name: 'Surprised', image: surprised},
        ],
    },
    "10-12": {
        "easy": [
          { name: 'Happy', image: happy_kid },
          { name: 'Sad', image: sad },
          { name: 'Excited', image: excited },
          { name: 'Calm', image: calm },
          { name: 'Surprised', image: surprised },
          { name: 'crying', image: crying },
          { name: 'Laughing', image: laughing },
          { name: 'Angry', image: angry },
          { name: 'Sleepy', image: sleepy },
          { name: 'Playful', image: playful },
          {name: 'contentment', image: contentment},
          {name: 'Hope', image: hope },
          {name: 'Boredom', image: boredom },
          {name: 'Guilt', image: guilt },
        ],
        "medium": [
          { name: 'Hungry', image: hungry },
          { name: 'Scared', image: scared },
          { name: 'Confused', image: confused },
          { name: 'Proud', image: proud },
          { name: 'Shy', image: shy },
          { name: 'Curious', image: curious },
          { name: 'Dancing', image: dancing },
          { name: 'Smart', image: smart },
          { name: 'Approval', image: approval },
          {name: 'Frustration', image: frustration },
          {name: 'Empathy', image: empathy },
          {name: 'Skepticism', image: skepticism},
          {name: 'satisfaction', image: satisfaction},
        ],
        "hard": [
          {name: 'Compassion', image: compassion},
          {name: 'Despair', image: despair},
          {name: 'Trust', image: trust},
          {name: 'Optimism', image: optimism},
          {name: 'Regret', image: regret},
          {name: 'Skepticism', image: skepticism},
          {name: 'Sympathy', image: sympathy},
          {name: 'Worry', image: worry},
          {name: 'comfort', image: comfort},
        ],
    },
  };
  
  export default emotionsData;
  
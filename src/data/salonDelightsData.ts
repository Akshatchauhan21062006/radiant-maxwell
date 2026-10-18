export interface VictorianBurn {
  id: string;
  frustration: string;
  emoji: string;
  author: 'Mark Twain' | 'Oscar Wilde' | 'George Bernard Shaw' | 'Dr. A.P.J. Abdul Kalam';
  quote: string;
  source: string;
  retort: string;
  verdict: string;
}

export interface PersonaQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    archetypeKey: 'satirist' | 'aesthete' | 'visionary' | 'polymath';
    subtext: string;
  }[];
}

export interface PersonaArchetype {
  key: 'satirist' | 'aesthete' | 'visionary' | 'polymath';
  title: string;
  subTitle: string;
  spiritTwin: string;
  motto: string;
  traits: string[];
  citation: string;
  color: string;
  icon: string;
}

export interface FortuneScroll {
  id: number;
  title: string;
  theme: 'Courage' | 'Vision' | 'Wit' | 'Intellect' | 'Patience';
  kalamInsight: string;
  kalamSource: string;
  twainWisdom: string;
  twainSource: string;
  salonBlessing: string;
}

export const VICTORIAN_BURNS: VictorianBurn[] = [
  {
    id: 'zoom-meeting',
    frustration: 'A 1-hour meeting that could have easily been a two-line email',
    emoji: '⏳',
    author: 'Mark Twain',
    quote: 'I was educated once — it took me years to get over it. The human race has only one really effective weapon, and that is laughter; yet they insist on assembling in committees.',
    source: 'Twain’s Notebooks & Speeches',
    retort: 'My dear sir, brevity is the soul of wit; let us not perform a three-act tragedy when a single aphorism would suffice.',
    verdict: 'Prescription: Send your regrets, cite "unavoidable intellectual commitments," and go read a good book.'
  },
  {
    id: 'linkedin-brag',
    frustration: 'Someone loudly humble-bragging on social media about their "journey"',
    emoji: '🦚',
    author: 'Oscar Wilde',
    quote: 'Self-advertisement is the modern substitute for personal virtue. I am not young enough to know everything.',
    source: 'The Picture of Dorian Gray & Aphorisms',
    retort: 'To trumpet one’s modesty from the rooftops is like powdering a mirror; it merely obscures whatever virtue was once reflected.',
    verdict: 'Prescription: Smirk gently, whisper "how dreadfully exhausting for them," and move along.'
  },
  {
    id: 'forty-tabs',
    frustration: 'Having 47 browser tabs open and falling down an existential rabbit hole',
    emoji: '🌀',
    author: 'Mark Twain',
    quote: 'A man who carries a cat by the tail learns something he can learn in no other way.',
    source: 'Tom Sawyer Abroad',
    retort: 'You have navigated your mental vessel into the turbulent rapids of the Mississippi. Drop anchor, jettison forty tabs, and declare total victory over the void.',
    verdict: 'Prescription: Close 40 tabs without looking. If it was important, the universe will send a telegraph.'
  },
  {
    id: 'k-reply',
    frustration: 'Receiving a cold, monosyllabic single-letter text message: "k."',
    emoji: '💬',
    author: 'George Bernard Shaw',
    quote: 'The single biggest problem in communication is the illusion that it has taken place.',
    source: 'Collected Epigrams & Maxims',
    retort: 'A single lonely consonant is not an answer, madam; it is a tombstone placed gently upon the grave of our conversation.',
    verdict: 'Prescription: Respond with silence so dignified it can be heard across county borders.'
  },
  {
    id: 'armchair-expert',
    frustration: 'Someone confidently lecturing you on a topic they Googled 4 minutes ago',
    emoji: '🧐',
    author: 'Mark Twain',
    quote: 'It ain’t what you don’t know that gets you into trouble. It’s what you know for sure that just ain’t so.',
    source: 'Twain’s American Maxims',
    retort: 'Behold the five-minute polymath: armed with a singular paragraph and fearless before centuries of human scholarship.',
    verdict: 'Prescription: Nod solemnly and ask them to elaborate on the footnote on page 342.'
  },
  {
    id: 'blank-page-panic',
    frustration: 'Staring at a blank screen with deadline panic creeping in',
    emoji: '📄',
    author: 'Dr. A.P.J. Abdul Kalam',
    quote: 'You cannot change your future, but you can change your habits, and surely your habits will change your future.',
    source: 'Wings of Fire / Ignited Minds',
    retort: 'The blank page is not an inquisitor; it is clean soil awaiting a single seed. Write one honest line, and the mountain begins to move.',
    verdict: 'Prescription: Write badly for ten minutes. Genius always arrives disguised as imperfect drafts.'
  },
  {
    id: 'unsolicited-advice',
    frustration: 'Unsolicited life advice from someone whose own life is in pure shambles',
    emoji: '🧭',
    author: 'Oscar Wilde',
    quote: 'It is always a silly thing to give advice, but to give good advice is fatal.',
    source: 'The Portrait of Mr. W.H.',
    retort: 'One should always receive unsolicited counsel with the gentle, pitying gratitude one reserves for a shipwrecked navigator offering sailing lessons.',
    verdict: 'Prescription: Smile sweetly and say, "What a thrillingly original perspective. I shall give it all the attention it deserves."'
  },
  {
    id: 'per-my-last-email',
    frustration: 'An email beginning with the passive-aggressive dagger: "Per my previous email..."',
    emoji: '🗡️',
    author: 'Mark Twain',
    quote: 'I didn’t have time to write a short letter, so I wrote a long one instead.',
    source: 'Letters of Mark Twain',
    retort: 'Victorian translation: I have already enunciated this truth with crystal lucidity; please do not compel me to order my seconds and pistols.',
    verdict: 'Prescription: Reply with: "Indeed. How wonderful that truth remains consistent over time."'
  }
];

export const PERSONA_QUESTIONS: PersonaQuestion[] = [
  {
    id: 1,
    question: 'A heated argument erupts at dinner regarding an utterly trivial issue. What is your move?',
    options: [
      {
        text: 'Deliver a calm, velvet paradox that leaves everyone silently staring into their wine.',
        archetypeKey: 'aesthete',
        subtext: 'Oscar Wilde style: Aesthetics over altercation.'
      },
      {
        text: 'Tell a dry, hilarious frontier story that gently exposes everyone as pompous fools.',
        archetypeKey: 'satirist',
        subtext: 'Mark Twain style: Wit as the universal equalizer.'
      },
      {
        text: 'Elevate the room by connecting their quarrel to a grander human purpose and shared dream.',
        archetypeKey: 'visionary',
        subtext: 'Dr. Kalam style: Inspiring minds toward greatness.'
      },
      {
        text: 'Sip your tea quietly while inwardly cataloging their historical and logical fallacies.',
        archetypeKey: 'polymath',
        subtext: 'The Scholar style: Silent archival wisdom.'
      }
    ]
  },
  {
    id: 2,
    question: 'How do you handle sheer bureaucratic absurdity or endless red tape?',
    options: [
      {
        text: 'Laugh out loud, make a brilliant joke of it, and quietly find the side entrance.',
        archetypeKey: 'satirist',
        subtext: 'Rules are suggestions written by people with too much time.'
      },
      {
        text: 'Frame the bureaucratic form in gilded wood and hang it as a monument to human comedy.',
        archetypeKey: 'aesthete',
        subtext: 'Irony is the only polite response to vulgar systems.'
      },
      {
        text: 'Tackle it with relentless, disciplined dedication until the system itself yields to vision.',
        archetypeKey: 'visionary',
        subtext: 'Indomitable spirit turns obstacles into stepping stones.'
      },
      {
        text: 'Study the rulebook in detail until you find the exact clause that makes them legally helpless.',
        archetypeKey: 'polymath',
        subtext: 'Knowledge is not just power; it is an impenetrable fortress.'
      }
    ]
  },
  {
    id: 3,
    question: 'If you could slip a secret bookmark into every library book in the world, what would it say?',
    options: [
      {
        text: '"Be yourself; everyone else is already taken."',
        archetypeKey: 'aesthete',
        subtext: 'Authenticity wrapped in unforgettable elegance.'
      },
      {
        text: '"Never let your schooling interfere with your education."',
        archetypeKey: 'satirist',
        subtext: 'Curiosity over dry curriculum.'
      },
      {
        text: '"Dreams transform into thoughts, and thoughts result in action."',
        archetypeKey: 'visionary',
        subtext: 'The spark that ignites nations and destinies.'
      },
      {
        text: '"In books lies the soul of the whole Past Time; tread reverently."',
        archetypeKey: 'polymath',
        subtext: 'The immortal communion of thinkers.'
      }
    ]
  },
  {
    id: 4,
    question: 'Your ultimate evening sanctuary after a chaotic day:',
    options: [
      {
        text: 'A candlelit parlour with velvet chairs, sparkling banter, and zero tedious topics.',
        archetypeKey: 'aesthete',
        subtext: 'Surrounded by wit, elegance, and beauty.'
      },
      {
        text: 'A quiet porch at twilight, watching human folly parade past while chuckling softly.',
        archetypeKey: 'satirist',
        subtext: 'Peaceful detachment with a generous dose of humor.'
      },
      {
        text: 'A clean desk, starry window, sketching out ambitious blueprints for tomorrow.',
        archetypeKey: 'visionary',
        subtext: 'Where dreams are forged into practical momentum.'
      },
      {
        text: 'A labyrinthine second-hand bookstore smelling of cedar, tea, and centuries of paper.',
        archetypeKey: 'polymath',
        subtext: 'The infinite comfort of unread pages.'
      }
    ]
  }
];

export const PERSONA_ARCHETYPES: Record<string, PersonaArchetype> = {
  satirist: {
    key: 'satirist',
    title: 'The Satirical Provocateur',
    subTitle: 'Grand Master of Common Sense & Irony',
    spiritTwin: 'Mark Twain',
    motto: 'Against the assault of laughter, nothing can stand.',
    traits: [
      'Devastating sense of timing',
      'Allergic to pretentious jargon',
      'Uses humor to heal rather than wound',
      'Finds comedy in the darkest corners'
    ],
    citation: 'Conferred for the rare and sacred ability to puncture pomposity with laughter and reveal the enduring humanity hidden beneath.',
    color: '#162A45',
    icon: 'Feather'
  },
  aesthete: {
    key: 'aesthete',
    title: 'The Paradoxical Aesthete',
    subTitle: 'Lord of Velvet Epigrams & Elegance',
    spiritTwin: 'Oscar Wilde',
    motto: 'Life is far too important a matter to talk seriously about.',
    traits: [
      'Speaks in memorable quotes',
      'Deep appreciation for style and nuance',
      'Masters the art of the charming contradiction',
      'Turns daily mundane moments into theater'
    ],
    citation: 'Conferred for recognizing that elegance is a supreme form of intellect, and that a single brilliant sentence outweighs ten heavy volumes.',
    color: '#C5A059',
    icon: 'Sparkles'
  },
  visionary: {
    key: 'visionary',
    title: 'The Visionary Igniter',
    subTitle: 'Bearer of the Ignited Mind & Courage',
    spiritTwin: 'Dr. A.P.J. Abdul Kalam',
    motto: 'If you want to shine like a sun, first burn like a sun.',
    traits: [
      'Unshakable optimism in human potential',
      'Translates noble ideals into disciplined action',
      'Lifts others up wherever they go',
      'Courageous in the face of setbacks'
    ],
    citation: 'Conferred for unwavering faith in the young, a burning passion for learning, and a soul dedicated to uplifting humanity.',
    color: '#15803D',
    icon: 'Flame'
  },
  polymath: {
    key: 'polymath',
    title: 'The Archival Polymath',
    subTitle: 'Guardian of the Quiet Codex & Deep Thought',
    spiritTwin: 'Francis Bacon & The Master Librarians',
    motto: 'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.',
    traits: [
      'Voracious and eclectic reader',
      'Notices connections nobody else sees',
      'Reflective and deeply grounded',
      'Treasures timeless truth over temporary hype'
    ],
    citation: 'Conferred for quiet brilliance, insatiable curiosity, and the gentle art of preserving the world’s deepest wisdom.',
    color: '#0369A1',
    icon: 'BookOpen'
  }
};

export const FORTUNE_SCROLLS: FortuneScroll[] = [
  {
    id: 1,
    title: 'The Scroll of the River & the Rocket',
    theme: 'Courage',
    kalamInsight: 'Excellence is a continuous process and not an accident. Look at the sky; we are not alone. The whole universe is friendly to us.',
    kalamSource: 'Wings of Fire (1999)',
    twainWisdom: 'Courage is resistance to fear, mastery of fear — not absence of fear. Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did.',
    twainSource: 'Pudd’nhead Wilson’s Calendar',
    salonBlessing: 'Today, dismiss the timid voices whispering doubts. Launch your ship onto the river; the current carries those who dare to steer.'
  },
  {
    id: 2,
    title: 'The Scroll of the Unruly Spark',
    theme: 'Vision',
    kalamInsight: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. To succeed in your mission, you must have single-minded devotion to your goal.',
    kalamSource: 'Ignited Minds (2002)',
    twainWisdom: 'Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.',
    twainSource: 'Mark Twain’s Speeches',
    salonBlessing: 'Protect your morning thoughts. One audacious, well-guarded dream will outshine a thousand small practical criticisms.'
  },
  {
    id: 3,
    title: 'The Scroll of the Gentle Laugh',
    theme: 'Wit',
    kalamInsight: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.',
    kalamSource: 'Address to Youth & Teachers',
    twainWisdom: 'Against the assault of laughter nothing can stand. Humor is mankind’s greatest blessing.',
    twainSource: 'The Mysterious Stranger',
    salonBlessing: 'Do not take worldly pomposity too solemnly today. Greet difficulty with a serene smile and watch it lose its fangs.'
  },
  {
    id: 4,
    title: 'The Scroll of the Deep Well',
    theme: 'Patience',
    kalamInsight: 'Man needs difficulties because they are necessary to enjoy success. If you fail, never give up because F.A.I.L. means "First Attempt In Learning".',
    kalamSource: 'Guiding Souls (2005)',
    twainWisdom: 'The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks.',
    twainSource: 'Twain’s Journal',
    salonBlessing: 'A seed grows in the silence of earth before it reaches the sun. Be patient with your unmanifested projects today.'
  },
  {
    id: 5,
    title: 'The Scroll of the Authentic Word',
    theme: 'Intellect',
    kalamInsight: 'Where there is righteousness in the heart, there is beauty in the character. When there is beauty in character, there is harmony in the home.',
    kalamSource: 'Indomitable Spirit',
    twainWisdom: 'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    twainSource: 'Notebook (1904)',
    salonBlessing: 'Speak truthfully, even when fashionable noise clamors in the other direction. Clarity of conscience is the highest luxury.'
  }
];

export const MAGNETIC_WORDS: string[] = [
  'midnight', 'wit', 'ignite', 'audacity', 'dream', 'lightning', 'courage',
  'laughter', 'truth', 'books', 'coffee', 'chaos', 'stars', 'scholar',
  'whisper', 'unruly', 'wisdom', 'soul', 'fire', 'wander', 'infinite',
  'silence', 'provoke', 'spark', 'destiny', 'ink', 'river', 'freedom',
  'poet', 'secret', 'rebel', 'the', 'is', 'and', 'in', 'without', 'a',
  'not', 'forever', 'to', 'always', 'burn', 'laugh', 'shine', 'never',
  'be', 'creates', 'with', 'beyond', 'light', 'gentle', 'wild'
];

export const MAGNETIC_POETRY_PRESETS = [
  ['audacity', 'creates', 'the', 'dream', 'without', 'fear'],
  ['a', 'whisper', 'of', 'wit', 'ignite', 'midnight', 'chaos'],
  ['laughter', 'is', 'unruly', 'lightning', 'in', 'the', 'soul'],
  ['books', 'and', 'coffee', 'forever', 'shine', 'truth'],
  ['courage', 'is', 'not', 'silence', 'but', 'wild', 'fire']
];

export interface SalonStamp {
  id: 'burn' | 'persona' | 'scroll' | 'poetry';
  name: string;
  category: string;
  iconName: string;
  description: string;
  unlockedAt?: string;
}

export const INITIAL_SALON_STAMPS: Record<string, SalonStamp> = {
  burn: {
    id: 'burn',
    name: 'The Satirist’s Quill',
    category: 'Victorian Burn',
    iconName: 'Zap',
    description: 'Unlocked by summoning a 19th-century retort for a 21st-century frustration.'
  },
  persona: {
    id: 'persona',
    name: 'The Athenaeum Seal',
    category: 'Literary Persona',
    iconName: 'Award',
    description: 'Unlocked by revealing your intellectual soul twin in the Persona Oracle.'
  },
  scroll: {
    id: 'scroll',
    name: 'Kalam’s Vision Rocket',
    category: 'Destiny Scroll',
    iconName: 'Flame',
    description: 'Unlocked by breaking the red wax seal and receiving a daily destiny scroll.'
  },
  poetry: {
    id: 'poetry',
    name: 'The Poet’s Inkpot',
    category: 'Magnetic Salon',
    iconName: 'Feather',
    description: 'Unlocked by composing and certifying a custom aphorism on the salon desk.'
  }
};

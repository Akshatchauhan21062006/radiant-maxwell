// Data for all 4 Literary Games

// 1. Diction Duel Data
export interface DictionQuestion {
  id: number;
  author: string;
  source: string;
  sentencePre: string;
  blank: string;
  sentencePost: string;
  lightningWord: string;       // The master author's exact word (Lightning ⚡)
  lightningBugWord: string;    // The pedestrian synonym (Lightning bug 🪲)
  commentary: string;          // Why the lightning word is genius
}

export const DICTION_QUESTIONS: DictionQuestion[] = [
  {
    id: 1,
    author: 'Mark Twain',
    source: 'Adventures of Huckleberry Finn',
    sentencePre: 'The stars were shining, and the leaves rustled in the woods ever so mournful; and I heard an owl, away off, who-whooing about somebody that was dead, and a whippowill and a dog crying about a person that was going to die; and the wind was trying to whisper something to me, and I couldn’t make out what it was, and so it made the cold shivers run over me. Then away out in the woods I heard that kind of sound that a ghost makes when it wants to tell about something that’s on its mind and can’t make itself understood, and so can’t rest easy in its grave, and has to go about thataway every night',
    blank: 'grieving',
    sentencePost: '.',
    lightningWord: 'grieving',
    lightningBugWord: 'crying',
    commentary: 'Twain chose "grieving" over "crying" because crying is merely acoustic; "grieving" imputes an eternal, restless sorrow to the supernatural spirit.'
  },
  {
    id: 2,
    author: 'William Shakespeare',
    source: 'Macbeth, Act V, Scene 5',
    sentencePre: 'Life’s but a walking shadow, a poor player that struts and frets his hour upon the stage, and then is heard no more. It is a tale told by an idiot, full of sound and fury,',
    blank: 'signifying',
    sentencePost: 'nothing.',
    lightningWord: 'signifying',
    lightningBugWord: 'meaning',
    commentary: '"Signifying" carries the weight of a grand herald or proclamation that collapses into void; "meaning nothing" sounds like casual speech.'
  },
  {
    id: 3,
    author: 'George Orwell',
    source: '1984',
    sentencePre: 'It was a bright cold day in April, and the clocks were',
    blank: 'striking thirteen',
    sentencePost: '.',
    lightningWord: 'striking thirteen',
    lightningBugWord: 'ringing one o’clock',
    commentary: 'The shock of "striking thirteen" immediately fractures normality in the reader’s mind, launching them instantly into a dystopian distortion of time itself.'
  },
  {
    id: 4,
    author: 'John Keats',
    source: 'Ode to a Nightingale',
    sentencePre: 'O, for a draught of vintage! that hath been cooled a long age in the deep-delved earth, tasting of Flora and the country green, dance, and Provençal song, and',
    blank: 'sunburnt mirth',
    sentencePost: '!',
    lightningWord: 'sunburnt mirth',
    lightningBugWord: 'outdoor happiness',
    commentary: 'Keats synesthetically blends tactile heat ("sunburnt") with emotional joy ("mirth"), compressing southern French vineyard culture into two indelible words.'
  },
  {
    id: 5,
    author: 'F. Scott Fitzgerald',
    source: 'The Great Gatsby',
    sentencePre: 'So we beat on, boats against the current, borne back',
    blank: 'ceaselessly',
    sentencePost: 'into the past.',
    lightningWord: 'ceaselessly',
    lightningBugWord: 'continuously',
    commentary: '"Ceaselessly" carries an oceanic, rolling cadence matching the rhythm of oars against waves, creating one of the most immortal closings in American literature.'
  }
];

// 2. Twain vs Wilde Data
export interface WitQuote {
  id: number;
  quote: string;
  author: 'Mark Twain' | 'Oscar Wilde' | 'George Bernard Shaw';
  workOrContext: string;
  wittyAnalysis: string;
}

export const WIT_QUOTES: WitQuote[] = [
  {
    id: 1,
    quote: 'Whenever people agree with me I always feel I must be wrong.',
    author: 'Oscar Wilde',
    workOrContext: 'The Critic as Artist (1891)',
    wittyAnalysis: 'Classic Victorian aesthetic paradox. Wilde weaponizes self-contradiction to mock conventional middle-class consensus.'
  },
  {
    id: 2,
    quote: 'Suppose you were an idiot. And suppose you were a member of Congress. But I repeat myself.',
    author: 'Mark Twain',
    workOrContext: 'Twain’s Notebooks (ca. 1891)',
    wittyAnalysis: 'American democratic irreverence at its peak. Twain sets up an apparent parallel only to brutally collapse it into an identity.'
  },
  {
    id: 3,
    quote: 'I can resist everything except temptation.',
    author: 'Oscar Wilde',
    workOrContext: 'Lady Windermere’s Fan (1892)',
    wittyAnalysis: 'A masterclass in litotic inversion: pretending to possess boundless virtue until the very condition of virtue is introduced.'
  },
  {
    id: 4,
    quote: 'The report of my death was an exaggeration.',
    author: 'Mark Twain',
    workOrContext: 'Cable from London to the New York Journal (1897)',
    wittyAnalysis: 'Twain’s dry frontier understatement. He famously dispatched this wire when an American newspaper prematurely printed his obituary.'
  },
  {
    id: 5,
    quote: 'We don’t stop playing because we grow old; we grow old because we stop playing.',
    author: 'George Bernard Shaw',
    workOrContext: 'Collected Maxims',
    wittyAnalysis: 'Shavian Fabian philosophy: turning a physiological reality on its head into an ethical indictment of premature cynicism.'
  },
  {
    id: 6,
    quote: 'If you tell the truth, you don’t have to remember anything.',
    author: 'Mark Twain',
    workOrContext: 'Notebook entry (1894)',
    wittyAnalysis: 'Twain frames moral honesty not as high piety, but as practical intellectual economy for lazy thinkers.'
  },
  {
    id: 7,
    quote: 'There is only one thing in the world worse than being talked about, and that is not being talked about.',
    author: 'Oscar Wilde',
    workOrContext: 'The Picture of Dorian Gray (1890)',
    wittyAnalysis: 'The quintessence of Decadent dandyism: vanity elevated into an ontological necessity.'
  },
  {
    id: 8,
    quote: 'Youth is a wonderful thing. What a crime to waste it on children.',
    author: 'George Bernard Shaw',
    workOrContext: 'Conversational quip',
    wittyAnalysis: 'Classic Shavian socialist exasperation: energy and potential distributed to those without the philosophical maturity to exploit them.'
  }
];

// 3. Rhetorical Alchemist Data
export interface RhetoricPuzzle {
  id: number;
  passage: string;
  speakerOrSource: string;
  correctDevice: 'Chiasmus' | 'Zeugma' | 'Litotes' | 'Oxymoron' | 'Anaphora' | 'Antithesis';
  options: string[];
  anatomicalBreakdown: string;
}

export const RHETORIC_PUZZLES: RhetoricPuzzle[] = [
  {
    id: 1,
    passage: '“Ask not what your country can do for you — ask what you can do for your country.”',
    speakerOrSource: 'John F. Kennedy (Inaugural Address, 1961)',
    correctDevice: 'Chiasmus',
    options: ['Chiasmus', 'Zeugma', 'Litotes', 'Hyperbole'],
    anatomicalBreakdown: 'Chiasmus reverses grammatical structure in an A-B : B-A mirror pattern (Country-You : You-Country) to generate solemn rhetorical balance.'
  },
  {
    id: 2,
    passage: '“He carried a strobe light and the responsibility for the lives of his men.”',
    speakerOrSource: 'Tim O’Brien (The Things They Carried)',
    correctDevice: 'Zeugma',
    options: ['Zeugma', 'Chiasmus', 'Oxymoron', 'Synecdoche'],
    anatomicalBreakdown: 'Zeugma (or Syllepsis) links a single verb ("carried") to both a concrete physical object ("strobe light") and an abstract moral burden ("responsibility").'
  },
  {
    id: 3,
    passage: '“He is not unmindful of your scholarly contributions.”',
    speakerOrSource: 'Academic Faculty Senate Correspondence',
    correctDevice: 'Litotes',
    options: ['Litotes', 'Antithesis', 'Metaphor', 'Zeugma'],
    anatomicalBreakdown: 'Litotes uses double negation ("not unmindful") to softly affirm awareness with British academic modesty and understatement.'
  },
  {
    id: 4,
    passage: '“O brawling love! O loving hate! O heavy lightness! Serious vanity!”',
    speakerOrSource: 'William Shakespeare (Romeo and Juliet, Act I, Scene 1)',
    correctDevice: 'Oxymoron',
    options: ['Oxymoron', 'Litotes', 'Chiasmus', 'Anaphora'],
    anatomicalBreakdown: 'Oxymoron juxtaposes mutually contradictory terms ("loving hate", "heavy lightness") to portray emotional tumult and internal psychological friction.'
  },
  {
    id: 5,
    passage: '“We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets...”',
    speakerOrSource: 'Winston Churchill (Parliamentary Address, 1940)',
    correctDevice: 'Anaphora',
    options: ['Anaphora', 'Zeugma', 'Oxymoron', 'Chiasmus'],
    anatomicalBreakdown: 'Anaphora deliberately repeats the identical opening cadence ("we shall fight") across successive clauses to build an irresistible oratorical crescendo.'
  }
];

// 4. Etymology Voyage Data (Words with Indian Roots)
export interface EtymologyWord {
  id: number;
  englishWord: string;
  pronunciation: string;
  indianOriginRoot: string;
  sourceLanguage: 'Sanskrit' | 'Hindi / Hindustani' | 'Tamil' | 'Malayalam';
  originalMeaning: string;
  fascinatingJourney: string;
}

export const ETYMOLOGY_WORDS: EtymologyWord[] = [
  {
    id: 1,
    englishWord: 'Juggernaut',
    pronunciation: '/ˈdʒʌɡərnɔːt/',
    indianOriginRoot: 'Jagannatha (जगन्नाथ)',
    sourceLanguage: 'Sanskrit',
    originalMeaning: '“Lord of the Universe” (Jagat = World + Natha = Lord)',
    fascinatingJourney: 'British observers in Puri, Odisha witnessed the monumental 16-wheeled chariot of Lord Jagannath during the Ratha Yatra festival. The sheer colossal scale and unstoppable momentum entered English vocabulary in the early 19th century to denote an invincible, crushing force.'
  },
  {
    id: 2,
    englishWord: 'Bungalow',
    pronunciation: '/ˈbʌŋɡəloʊ/',
    indianOriginRoot: 'Bangla (बंगला)',
    sourceLanguage: 'Hindi / Hindustani',
    originalMeaning: '“In the Bengal style” (relating to traditional single-story thatched houses in Bengal)',
    fascinatingJourney: 'British colonial officers adapted the spacious, veranda-shaded vernacular architecture of Bengal countryside dwellings to escape summer heat. The word traveled across the British Empire to California and Britain, becoming a global architectural term for a single-story detached house.'
  },
  {
    id: 3,
    englishWord: 'Avatar',
    pronunciation: '/ˈævətɑːr/',
    indianOriginRoot: 'Avatāra (अवतार)',
    sourceLanguage: 'Sanskrit',
    originalMeaning: '“Descent” (Ava = down + Tara = crossing/passing down into earthly form)',
    fascinatingJourney: 'Originally signifying the descent of a divine entity into earthly embodiment in Hindu theology, the word was borrowed into 20th-century cyberpunk literature (notably Neal Stephenson’s Snow Crash) and now universally defines a person’s digital persona in computing, virtual reality, and cinema.'
  },
  {
    id: 4,
    englishWord: 'Catamaran',
    pronunciation: '/ˌkætəməˈræn/',
    indianOriginRoot: 'Kattu-maram (கட்டுமரம்)',
    sourceLanguage: 'Tamil',
    originalMeaning: '“Tied logs” (Kattu = to tie + Maram = wood / tree logs)',
    fascinatingJourney: 'Traditional Tamil and Coromandel coast fishermen lashed two buoyant logs together with coir rope to navigate rough surf. Impressed by its speed and stability on open seas, English sailors adopted the design and Tamil name, giving birth to the modern twin-hulled sailboat.'
  },
  {
    id: 5,
    englishWord: 'Pundit',
    pronunciation: '/ˈpʌndɪt/',
    indianOriginRoot: 'Pandita (पण्डित)',
    sourceLanguage: 'Sanskrit',
    originalMeaning: '“Learned scholar, teacher, or master of Vedic philosophical texts”',
    fascinatingJourney: 'Adopted in colonial administration to denote learned native legal advisers on Indian jurisprudence. By the mid-20th century, American political journalism popularized "pundit" to denote any media commentator or expert analyst who offers opinions on news broadcasts.'
  },
  {
    id: 6,
    englishWord: 'Shampoo',
    pronunciation: '/ʃæmˈpuː/',
    indianOriginRoot: 'Champna (चाँपना) / Chāmpo (ચામ्पो)',
    sourceLanguage: 'Hindi / Hindustani',
    originalMeaning: '“To press, knead, or therapeutic head massage”',
    fascinatingJourney: 'Sake Dean Mahomed, an Indian traveller and entrepreneur from Patna, introduced herbal steam baths and "champooing" (therapeutic head massage) to Brighton, England in 1814, eventually being appointed personal "Shampooing Surgeon" to Kings George IV and William IV!'
  }
];

export interface LiteraryQuote {
  id: string;
  author: string;
  source?: string;
  theme: 'Twainian Wit' | 'Kalam on Education' | 'Literary Philosophy' | 'Language & Pedagogy';
  quote: string;
  drDodiyaReflection: string;
}

export interface LiteraryDevice {
  term: string;
  category: 'Rhetoric & Figures of Speech' | 'ELT & Pedagogy' | 'Literary Criticism';
  definition: string;
  example: string;
  pedagogicalApplication: string;
}

export interface LiteraryQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const LITERARY_QUOTES: LiteraryQuote[] = [
  {
    id: 'twain-1',
    author: 'Mark Twain',
    source: 'Speeches and Notebooks',
    theme: 'Twainian Wit',
    quote: 'The difference between the almost right word and the right word is really a large matter—it’s the difference between the lightning bug and the lightning.',
    drDodiyaReflection: 'In English language education, vocabulary is not mere ornamentation; it is the precision of thought itself. Teaching learners to discern nuances between near-synonyms transforms functional literacy into expressive mastery.'
  },
  {
    id: 'kalam-1',
    author: 'Dr. A.P.J. Abdul Kalam',
    source: 'Indomitable Spirit & Wings of Fire',
    theme: 'Kalam on Education',
    quote: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great.',
    drDodiyaReflection: 'As explored in my doctoral dissertation on Dr. Kalam’s educational philosophy, education must cultivate curiosity rather than rote obedience. The classroom is a sacred incubation space for creative inquiry.'
  },
  {
    id: 'twain-2',
    author: 'Mark Twain',
    source: 'Letter to George Bainton, 1888',
    theme: 'Twainian Wit',
    quote: 'I have never let my schooling interfere with my education.',
    drDodiyaReflection: 'A profound reminder for modern educators under NEP 2020: formal institutional boundaries must never suffocate real-world curiosity, autonomous reading, and independent critical faculties.'
  },
  {
    id: 'pedagogy-1',
    author: 'B. Kumaravadivelu',
    source: 'Beyond Methods: Macrostrategies for Language Teaching',
    theme: 'Language & Pedagogy',
    quote: 'Post-method pedagogy recognizes that language teaching cannot be reduced to a single pre-packaged method. It demands particularity, practicality, and possibility.',
    drDodiyaReflection: 'In our Indian multilingual context, language pedagogy flourishes when teachers act as reflective practitioners—tailoring methods to local linguistic realities rather than following imported templates.'
  },
  {
    id: 'kalam-2',
    author: 'Dr. A.P.J. Abdul Kalam',
    source: 'Ignited Minds',
    theme: 'Kalam on Education',
    quote: 'If a country is to be corruption-free and become a nation of beautiful minds, I strongly feel there are three key societal members who can make a difference: the father, the mother, and the teacher.',
    drDodiyaReflection: 'Teacher education is the bedrock of societal transformation. When we prepare reflective, empathetic teachers, their influence cascades across generations of learners.'
  },
  {
    id: 'twain-3',
    author: 'Mark Twain',
    source: 'Pudd’nhead Wilson',
    theme: 'Twainian Wit',
    quote: 'A person who won’t read has no advantage over one who can’t read.',
    drDodiyaReflection: 'Functional literacy without the habit of voluntary reading produces an impoverished intellect. Fostering a genuine love for reading remains the teacher’s highest pedagogical triumph.'
  },
  {
    id: 'lit-1',
    author: 'Francis Bacon',
    source: 'Of Studies (1625)',
    theme: 'Literary Philosophy',
    quote: 'Reading maketh a full man; conference a ready man; and writing an exact man.',
    drDodiyaReflection: 'Bacon captures the tripartite core of humanities education: reception through deep reading, dialogue through academic conference, and precision through sustained scholarship.'
  },
  {
    id: 'kalam-3',
    author: 'Dr. A.P.J. Abdul Kalam',
    source: 'Address to National Convention of Educators',
    theme: 'Kalam on Education',
    quote: 'Creativity is the key to knowledge society and teachers need to continuously innovate to ignite the young minds.',
    drDodiyaReflection: 'Integrating emerging technologies like AI into English Language Education serves this very objective: freeing teachers from mechanical tasks so they can focus on creative mentoring.'
  }
];

export const LITERARY_DEVICES: LiteraryDevice[] = [
  {
    term: 'Chiasmus',
    category: 'Rhetoric & Figures of Speech',
    definition: 'A rhetorical device in which two or more clauses are balanced against each other by the reversal of their grammatical structure (A-B : B-A).',
    example: '"Let us never negotiate out of fear, but let us never fear to negotiate." — J.F. Kennedy',
    pedagogicalApplication: 'Helps advanced learners structure antithetical arguments and persuasive discourse in academic essay writing.'
  },
  {
    term: 'Post-Method Pedagogy',
    category: 'ELT & Pedagogy',
    definition: 'A pedagogical framework moving beyond traditional rigid methods (e.g., Grammar Translation, Direct Method) towards teacher autonomy, context-sensitivity, and reflective action.',
    example: 'Integrating local folklore, multilingual translation, and communicative tasks tailored to rural Indian classrooms.',
    pedagogicalApplication: 'Empowers teacher-trainees at HMPIETR to construct contextually sound teaching strategies instead of rigidly obeying single textbook paradigms.'
  },
  {
    term: 'Zeugma',
    category: 'Rhetoric & Figures of Speech',
    definition: 'A figure of speech in which a single word applies to two or more others in different senses (literal and figurative simultaneously).',
    example: '"She arrived in a taxi and a rage." or "He held his breath and her hand."',
    pedagogicalApplication: 'Enhances stylistic economy and teaches students how poetic compression generates wit and emotional resonance.'
  },
  {
    term: 'Multilingual Pedagogy',
    category: 'ELT & Pedagogy',
    definition: 'An instructional approach that utilizes students’ home languages (L1) as cognitive scaffolds rather than treating them as linguistic interference.',
    example: 'Translanguaging activities in bilingual English-Gujarati or English-Hindi classrooms under NEP 2020.',
    pedagogicalApplication: 'Builds learner confidence and cognitive depth by validating their plurilingual identities while acquiring target English proficiency.'
  },
  {
    term: 'Litotes',
    category: 'Rhetoric & Figures of Speech',
    definition: 'An intentional understatement wherein an affirmative is expressed by negating its contrary.',
    example: '"He is no fool." (meaning he is wise) or "The lecture was not uninteresting."',
    pedagogicalApplication: 'Cultivates irony, British conversational nuance, and academic restraint in scholarly discourse.'
  }
];

export const LITERARY_QUIZ: LiteraryQuizQuestion[] = [
  {
    id: 1,
    question: 'In Mark Twain’s famous observation on diction, what is the contrast between the "almost right word" and the "right word"?',
    options: [
      'The difference between a whisper and a scream',
      'The difference between the lightning bug and the lightning',
      'The difference between prose and poetry',
      'The difference between ink and water'
    ],
    correctIndex: 1,
    explanation: 'Twain humorously emphasized precision in word choice: a near-miss word lacks the electrifying illumination of the exact, rightful term.'
  },
  {
    id: 2,
    question: 'Which of the following principles forms the foundation of Dr. A.P.J. Abdul Kalam’s educational thought?',
    options: [
      'Standardized uniform examination ranking above all else',
      'Holistic cultivation of creativity, value-based thinking, and self-reliance',
      'Separation of scientific inquiry from moral character',
      'Exclusive focus on rote theoretical memorization'
    ],
    correctIndex: 1,
    explanation: 'Dr. Kalam’s educational vision centered on developing "beautiful minds" through the union of creative thinking, ethical values, and technological purpose.'
  },
  {
    id: 3,
    question: 'In Kumaravadivelu’s post-method pedagogy, what are the three foundational parameters?',
    options: [
      'Particularity, Practicality, and Possibility',
      'Grammar, Vocabulary, and Pronunciation',
      'Reading, Writing, and Listening',
      'Standardization, Evaluation, and Certification'
    ],
    correctIndex: 0,
    explanation: 'Post-method pedagogy is anchored in the "3 Ps": Particularity (context-sensitivity), Practicality (teacher autonomy), and Possibility (empowerment and identity).'
  }
];

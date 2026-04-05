const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// ── Bind to 0.0.0.0 (required for Render/Railway) ──
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});

app.use(express.static(path.join(__dirname, 'public')));

// ── Health check endpoint (keeps Render from sleeping) ──
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', players: Object.keys(gameState.players).length });
});

// ============================================================
//  ALL 60 QUESTIONS — COMPREHENSIVE REVIEW UNITS 1–5
// ============================================================
const questions = [
  // ──────────── PART 1: GAP-FILL ────────────
  {
    id: 1, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete the sentence:\n\"I study law because I believe in __________ — fairness for all people.\"",
    answer: "justice", acceptableAnswers: ["justice"], points: 10, timeLimit: 20
  },
  {
    id: 2, category: "Part 1 — Gap-Fill", type: "mcq",
    question: "Choose the correct form:\n\"Law __________ a system of rules that every society needs.\"",
    options: ["am", "is", "are"], answer: "is", points: 10, timeLimit: 15
  },
  {
    id: 3, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Every __________ has rights and responsibilities.\"",
    answer: "citizen", acceptableAnswers: ["citizen"], points: 10, timeLimit: 20
  },
  {
    id: 4, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Some actions are __________. For example, stealing is a crime.\"",
    answer: "illegal", acceptableAnswers: ["illegal"], points: 10, timeLimit: 20
  },
  {
    id: 5, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"The law protects the __________ of every person — the right to education, the right to equality, and many others.\"",
    answer: "rights", acceptableAnswers: ["rights"], points: 10, timeLimit: 20
  },
  {
    id: 6, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"The Code of Hammurabi is the oldest known __________ code of laws.\"",
    answer: "written", acceptableAnswers: ["written"], points: 10, timeLimit: 20
  },
  {
    id: 7, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Hammurabi was a famous king from __________ Babylon.\"",
    answer: "ancient", acceptableAnswers: ["ancient"], points: 10, timeLimit: 20
  },
  {
    id: 8, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Babylon was a great __________ in Mesopotamia.\"",
    answer: "civilization", acceptableAnswers: ["civilization", "civilisation"], points: 10, timeLimit: 20
  },
  {
    id: 9, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Before written codes, there were __________ traditions and customs.\"",
    answer: "oral", acceptableAnswers: ["oral"], points: 10, timeLimit: 20
  },
  {
    id: 10, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"The Roman __________ is also very important in legal history.\"",
    answer: "empire", acceptableAnswers: ["empire"], points: 10, timeLimit: 25
  },
  {
    id: 11, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"In the Arab and Islamic world, Sharia is a major __________ legal tradition.\"",
    answer: "religious", acceptableAnswers: ["religious"], points: 10, timeLimit: 20
  },
  {
    id: 12, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"Laws __________ over time — they change and develop as societies grow.\"",
    answer: "evolve", acceptableAnswers: ["evolve"], points: 10, timeLimit: 20
  },
  {
    id: 13, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"There is a __________ of courts in Morocco — from bottom to top.\"",
    answer: "hierarchy", acceptableAnswers: ["hierarchy"], points: 10, timeLimit: 20
  },
  {
    id: 14, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"At the bottom, there is the __________. This is where a case begins.\"",
    answer: "first instance court", acceptableAnswers: ["first instance court"], points: 15, timeLimit: 25
  },
  {
    id: 15, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"The __________ is the person accused of a crime.\"",
    answer: "defendant", acceptableAnswers: ["defendant"], points: 10, timeLimit: 20
  },
  {
    id: 16, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"After the trial, the judge announces the __________ — the final decision of the court.\"",
    answer: "verdict", acceptableAnswers: ["verdict"], points: 10, timeLimit: 20
  },
  {
    id: 17, category: "Part 1 — Gap-Fill", type: "mcq",
    question: "Fill both blanks:\n\"If a person is not satisfied, there is a solution: an __________. The person sends the case to the __________.\"",
    options: ["appeal / court of appeal", "verdict / Supreme Court", "decree / tribunal", "treaty / first instance court"],
    answer: "appeal / court of appeal", points: 15, timeLimit: 25
  },
  {
    id: 18, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"I want to be a __________ one day. This person represents clients in court and prepares legal documents.\"",
    answer: "lawyer", acceptableAnswers: ["lawyer"], points: 10, timeLimit: 20
  },
  {
    id: 19, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"A __________ certifies official documents and verifies that contracts are legal.\"",
    answer: "notary", acceptableAnswers: ["notary"], points: 10, timeLimit: 20
  },
  {
    id: 20, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"A __________ delivers court documents to people and enforces court decisions.\"",
    answer: "bailiff", acceptableAnswers: ["bailiff"], points: 10, timeLimit: 20
  },
  {
    id: 21, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"The __________ is the supreme source of law. It defines the rights of citizens and the powers of the state.\"",
    answer: "constitution", acceptableAnswers: ["constitution"], points: 10, timeLimit: 20
  },
  {
    id: 22, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"A __________ is an agreement between Morocco and other countries.\"",
    answer: "treaty", acceptableAnswers: ["treaty"], points: 10, timeLimit: 20
  },
  {
    id: 23, category: "Part 1 — Gap-Fill", type: "mcq",
    question: "Fill both blanks:\n\"Parliament enacts __________ every year. A __________ is a written law that Parliament creates and approves.\"",
    options: ["legislation / statute", "decree / regulation", "customs / treaty", "jurisprudence / verdict"],
    answer: "legislation / statute", points: 15, timeLimit: 25
  },
  {
    id: 24, category: "Part 1 — Gap-Fill", type: "text",
    question: "Complete:\n\"A __________ is a formal order from the Head of Government.\"",
    answer: "decree", acceptableAnswers: ["decree"], points: 10, timeLimit: 20
  },
  {
    id: 25, category: "Part 1 — Gap-Fill", type: "mcq",
    question: "Fill the blanks:\n\"__________ is a secondary source of law. Judges __________ the law and __________ it to specific cases.\"",
    options: ["Jurisprudence / interpret / apply", "Customs / create / enforce", "Legislation / write / publish", "Treaty / sign / ratify"],
    answer: "Jurisprudence / interpret / apply", points: 15, timeLimit: 25
  },

  // ──────────── EXERCISE 2: WHO AM I? RIDDLES ────────────
  {
    id: 26, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am a system of rules. Every society needs me. Without me, there is chaos. Citizens are protected by me.\"",
    answer: "law", acceptableAnswers: ["law", "the law"], points: 15, timeLimit: 25
  },
  {
    id: 27, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am the highest source of law in Morocco. I was adopted in 2011. No law can contradict me.\"",
    answer: "the constitution", acceptableAnswers: ["constitution", "the constitution", "the moroccan constitution"], points: 15, timeLimit: 25
  },
  {
    id: 28, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am a person. I work in a court. I listen to both sides. I am responsible for justice. I decide the verdict.\"",
    answer: "judge", acceptableAnswers: ["judge", "a judge", "the judge"], points: 15, timeLimit: 20
  },
  {
    id: 29, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am very, very old — almost 4,000 years old. I am a collection of 282 laws written on stone. I come from ancient Babylon.\"",
    answer: "the code of hammurabi", acceptableAnswers: ["code of hammurabi", "the code of hammurabi", "hammurabi code", "hammurabi's code"], points: 15, timeLimit: 25
  },
  {
    id: 30, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am not a person. I am a place. I am at the bottom of the court hierarchy. A case begins with me.\"",
    answer: "first instance court", acceptableAnswers: ["first instance court", "the first instance court", "court of first instance"], points: 15, timeLimit: 25
  },
  {
    id: 31, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I work for the state. I present the case against the defendant. I try to prove the defendant is guilty.\"",
    answer: "prosecutor", acceptableAnswers: ["prosecutor", "a prosecutor", "the prosecutor"], points: 15, timeLimit: 20
  },
  {
    id: 32, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I am not written on paper or stone. People learn me from their parents and grandparents. I am a secondary source of law.\"",
    answer: "customs", acceptableAnswers: ["customs", "custom", "oral traditions", "traditions"], points: 15, timeLimit: 25
  },
  {
    id: 33, category: "Exercise 2 — Riddles", type: "text",
    question: "WHO AM I?\n\"I deliver court documents to people. I enforce court decisions. If a person must pay or leave, I make sure it happens.\"",
    answer: "bailiff", acceptableAnswers: ["bailiff", "a bailiff", "the bailiff"], points: 15, timeLimit: 20
  },

  // ──────────── EXERCISE 3: ERROR CORRECTION ────────────
  {
    id: 34, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"There is many courts in the country.\"",
    options: ["There are many courts in the country.", "There is much courts in the country.", "There is many court in the country.", "There was many courts in the country."],
    answer: "There are many courts in the country.", points: 15, timeLimit: 25
  },
  {
    id: 35, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error (TWO mistakes):\n\"A lawyer decide the verdict in the courtroom.\"",
    options: ["A judge decides the verdict in the courtroom.", "A lawyer decides the verdict in the courtroom.", "A lawyer decided the verdict in the courtroom.", "A judge decide the verdicts in the courtroom."],
    answer: "A judge decides the verdict in the courtroom.", points: 15, timeLimit: 25
  },
  {
    id: 36, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"The Code of Hammurabi are a modern document from Mesopotamia.\"",
    options: ["The Code of Hammurabi is an ancient document from Mesopotamia.", "The Code of Hammurabi are an ancient document from Mesopotamia.", "The Code of Hammurabi is a modern document from Mesopotamia.", "The Codes of Hammurabi are modern documents from Mesopotamia."],
    answer: "The Code of Hammurabi is an ancient document from Mesopotamia.", points: 15, timeLimit: 25
  },
  {
    id: 37, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"Parliament enact legislation every year.\"",
    options: ["Parliament enacts legislation every year.", "Parliament enacted legislation every year.", "Parliaments enact legislation every year.", "Parliament enact legislations every year."],
    answer: "Parliament enacts legislation every year.", points: 15, timeLimit: 20
  },
  {
    id: 38, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error (TWO mistakes):\n\"A prosecutor represent clients in court.\"",
    options: ["A lawyer represents clients in court.", "A prosecutor represents clients in court.", "A prosecutor represent the state in court.", "Prosecutors represent clients in court."],
    answer: "A lawyer represents clients in court.", points: 15, timeLimit: 25
  },
  {
    id: 39, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"Are there a Supreme Court in every country?\"",
    options: ["Is there a Supreme Court in every country?", "Are there Supreme Courts in every country?", "Are there a Supreme Courts in every country?", "Is there Supreme Court in every country?"],
    answer: "Is there a Supreme Court in every country?", points: 15, timeLimit: 25
  },
  {
    id: 40, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error (TWO mistakes):\n\"A notary deliver court documents to people.\"",
    options: ["A bailiff delivers court documents to people.", "A notary delivers court documents to people.", "A notary deliver court document to people.", "Notaries deliver court documents to people."],
    answer: "A bailiff delivers court documents to people.", points: 15, timeLimit: 25
  },
  {
    id: 41, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"I is a law student at the university.\"",
    options: ["I am a law student at the university.", "I are a law student at the university.", "I is a law students at the university.", "I was a law student at the university."],
    answer: "I am a law student at the university.", points: 10, timeLimit: 15
  },
  {
    id: 42, category: "Exercise 3 — Error Correction", type: "mcq",
    question: "Find and correct the error:\n\"There are only one Supreme Court in Morocco.\"",
    options: ["There is only one Supreme Court in Morocco.", "There are only two Supreme Courts in Morocco.", "There are one Supreme Courts in Morocco.", "There is only Supreme Court in Morocco."],
    answer: "There is only one Supreme Court in Morocco.", points: 10, timeLimit: 20
  },

  // ──────────── EXERCISE 4: SENTENCE TRANSFORMATION ────────────
  {
    id: 43, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform into a QUESTION:\n\"There is a judge in the courtroom.\"",
    options: ["Is there a judge in the courtroom?", "Are there a judge in the courtroom?", "Does there is a judge in the courtroom?", "There is a judge in the courtroom?"],
    answer: "Is there a judge in the courtroom?", points: 10, timeLimit: 20
  },
  {
    id: 44, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform into NEGATIVE:\n\"The constitution is the highest source of law.\"",
    options: ["The constitution is not the highest source of law.", "The constitution does not the highest source of law.", "The constitution not is the highest source of law.", "The constitution are not the highest source of law."],
    answer: "The constitution is not the highest source of law.", points: 10, timeLimit: 20
  },
  {
    id: 45, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform with 'Does':\n\"Parliament enacts legislation.\"",
    options: ["Does Parliament enact legislation?", "Does Parliament enacts legislation?", "Do Parliament enact legislation?", "Is Parliament enact legislation?"],
    answer: "Does Parliament enact legislation?", points: 10, timeLimit: 20
  },
  {
    id: 46, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform into NEGATIVE:\n\"A bailiff delivers court documents.\"",
    options: ["A bailiff does not deliver court documents.", "A bailiff do not deliver court documents.", "A bailiff not delivers court documents.", "A bailiff does not delivers court documents."],
    answer: "A bailiff does not deliver court documents.", points: 10, timeLimit: 20
  },
  {
    id: 47, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform into NEGATIVE:\n\"There are witnesses in a court of appeal.\"",
    options: ["There are not witnesses in a court of appeal.", "There is not witnesses in a court of appeal.", "There do not witnesses in a court of appeal.", "There aren't no witnesses in a court of appeal."],
    answer: "There are not witnesses in a court of appeal.", points: 10, timeLimit: 20
  },
  {
    id: 48, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform into NEGATIVE:\n\"Oral traditions are written on paper.\"",
    options: ["Oral traditions are not written on paper.", "Oral traditions do not written on paper.", "Oral traditions is not written on paper.", "Oral traditions does not write on paper."],
    answer: "Oral traditions are not written on paper.", points: 10, timeLimit: 20
  },
  {
    id: 49, category: "Exercise 4 — Transformation", type: "mcq",
    question: "Transform with 'Does':\n\"A prosecutor works for the state.\"",
    options: ["Does a prosecutor work for the state?", "Does a prosecutor works for the state?", "Do a prosecutor work for the state?", "Is a prosecutor work for the state?"],
    answer: "Does a prosecutor work for the state?", points: 10, timeLimit: 20
  },

  // ──────────── EXERCISE 8: COMPLETE THE TABLE ────────────
  {
    id: 50, category: "Exercise 8 — Table", type: "mcq",
    question: "What is the NEGATIVE of:\n\"There is a judge in the courtroom.\"",
    options: ["There is not a judge in the courtroom.", "There are not a judge in the courtroom.", "There does not a judge in the courtroom.", "There is no not judge in the courtroom."],
    answer: "There is not a judge in the courtroom.", points: 10, timeLimit: 20
  },
  {
    id: 51, category: "Exercise 8 — Table", type: "mcq",
    question: "What is the AFFIRMATIVE of:\n\"There are not witnesses in the court of appeal.\"",
    options: ["There are witnesses in the court of appeal.", "There is witnesses in the court of appeal.", "There have witnesses in the court of appeal.", "There do witnesses in the court of appeal."],
    answer: "There are witnesses in the court of appeal.", points: 10, timeLimit: 20
  },
  {
    id: 52, category: "Exercise 8 — Table", type: "mcq",
    question: "What is the AFFIRMATIVE of:\n\"A notary does not deliver court documents.\"",
    options: ["A notary delivers court documents.", "A notary deliver court documents.", "A notary does deliver court documents.", "A notary is delivering court documents."],
    answer: "A notary delivers court documents.", points: 10, timeLimit: 20
  },
  {
    id: 53, category: "Exercise 8 — Table", type: "mcq",
    question: "What is the YES/NO QUESTION form of:\n\"Parliament enacts legislation.\"",
    options: ["Does Parliament enact legislation?", "Does Parliament enacts legislation?", "Do Parliament enact legislation?", "Is Parliament enacts legislation?"],
    answer: "Does Parliament enact legislation?", points: 10, timeLimit: 20
  },
  {
    id: 54, category: "Exercise 8 — Table", type: "mcq",
    question: "What is the AFFIRMATIVE of:\n\"There is not a jury in every country.\"",
    options: ["There is a jury in every country.", "There are a jury in every country.", "There has a jury in every country.", "There be a jury in every country."],
    answer: "There is a jury in every country.", points: 10, timeLimit: 20
  },

  // ──────────── BONUS: GENERAL KNOWLEDGE ────────────
  {
    id: 55, category: "Bonus — General Knowledge", type: "mcq",
    question: "In the hierarchy of sources of law in Morocco, which is the SUPREME source?",
    options: ["The Constitution", "International Treaties", "Legislation (statutes)", "Customs"],
    answer: "The Constitution", points: 20, timeLimit: 20
  },
  {
    id: 56, category: "Bonus — General Knowledge", type: "mcq",
    question: "Which court is at the TOP of the court hierarchy in Morocco?",
    options: ["The Supreme Court (Court of Cassation)", "The Court of Appeal", "The First Instance Court", "The Commercial Tribunal"],
    answer: "The Supreme Court (Court of Cassation)", points: 20, timeLimit: 20
  },
  {
    id: 57, category: "Bonus — General Knowledge", type: "mcq",
    question: "What does a PROSECUTOR do?",
    options: ["Represents the state and tries to prove the defendant is guilty", "Represents the defendant in court", "Certifies official documents", "Delivers court documents to people"],
    answer: "Represents the state and tries to prove the defendant is guilty", points: 20, timeLimit: 20
  },
  {
    id: 58, category: "Bonus — General Knowledge", type: "mcq",
    question: "Jurisprudence is a __________ source of law.",
    options: ["secondary", "supreme", "primary", "constitutional"],
    answer: "secondary", points: 20, timeLimit: 15
  },
  {
    id: 59, category: "Bonus — General Knowledge", type: "mcq",
    question: "Which is NOT a legal profession?",
    options: ["Architect", "Judge", "Notary", "Bailiff"],
    answer: "Architect", points: 20, timeLimit: 15
  },
  {
    id: 60, category: "Bonus — General Knowledge", type: "mcq",
    question: "A DECREE is a formal order from the:",
    options: ["Head of Government", "Judge", "Parliament", "Notary"],
    answer: "Head of Government", points: 20, timeLimit: 15
  }
];

// ============================================================
//  GAME STATE
// ============================================================
let gameState = {
  phase: 'lobby',
  currentQuestionIndex: -1,
  players: {},
  currentAnswers: {},
  questionStartTime: null,
  timerInterval: null,
  timeRemaining: 0
};

function getLeaderboard() {
  return Object.entries(gameState.players)
    .map(([id, p]) => ({ id, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
}

function getPlayerCount() {
  return Object.keys(gameState.players).length;
}

// ============================================================
//  SOCKET.IO
// ============================================================
io.on('connection', (socket) => {
  console.log(`+ Connected: ${socket.id}`);

  // ── TEACHER ──
  socket.on('teacher:join', () => {
    socket.join('teachers');
    socket.emit('game:state', {
      phase: gameState.phase,
      players: gameState.players,
      currentQuestionIndex: gameState.currentQuestionIndex,
      totalQuestions: questions.length,
      leaderboard: getLeaderboard()
    });
  });

  socket.on('teacher:startGame', () => {
    gameState.phase = 'lobby';
    gameState.currentQuestionIndex = -1;
    for (let id in gameState.players) {
      gameState.players[id].score = 0;
      gameState.players[id].answers = [];
    }
    gameState.currentAnswers = {};
    io.emit('game:reset');
    io.to('teachers').emit('game:state', {
      phase: 'lobby', players: gameState.players,
      currentQuestionIndex: -1, totalQuestions: questions.length,
      leaderboard: getLeaderboard()
    });
  });

  socket.on('teacher:nextQuestion', () => {
    gameState.currentQuestionIndex++;
    if (gameState.currentQuestionIndex >= questions.length) {
      gameState.phase = 'finished';
      io.emit('game:finished', { leaderboard: getLeaderboard() });
      return;
    }
    gameState.phase = 'question';
    gameState.currentAnswers = {};
    const q = questions[gameState.currentQuestionIndex];
    gameState.questionStartTime = Date.now();
    gameState.timeRemaining = q.timeLimit;

    const questionData = {
      id: q.id, category: q.category, type: q.type,
      question: q.question, options: q.options || null,
      points: q.points, timeLimit: q.timeLimit,
      questionNumber: gameState.currentQuestionIndex + 1,
      totalQuestions: questions.length
    };
    io.emit('game:question', questionData);

    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
      gameState.timeRemaining--;
      io.emit('game:timer', { timeRemaining: gameState.timeRemaining });
      if (gameState.timeRemaining <= 0) {
        clearInterval(gameState.timerInterval);
        showResults();
      }
    }, 1000);
  });

  socket.on('teacher:showResults', () => {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    showResults();
  });

  socket.on('teacher:showLeaderboard', () => {
    gameState.phase = 'leaderboard';
    io.emit('game:leaderboard', { leaderboard: getLeaderboard() });
  });

  function showResults() {
    gameState.phase = 'results';
    const q = questions[gameState.currentQuestionIndex];
    const results = {};
    let correctCount = 0, totalAnswered = 0;

    for (let sid in gameState.currentAnswers) {
      totalAnswered++;
      const pa = gameState.currentAnswers[sid];
      let isCorrect = false;
      if (q.type === 'mcq') {
        isCorrect = pa.answer === q.answer;
      } else {
        const norm = pa.answer.trim().toLowerCase();
        isCorrect = (q.acceptableAnswers || [q.answer]).some(a => norm === a.toLowerCase());
      }
      if (isCorrect) {
        correctCount++;
        const timeTaken = (pa.timestamp - gameState.questionStartTime) / 1000;
        const timeBonus = Math.max(0, Math.round((q.timeLimit - timeTaken) / q.timeLimit * q.points * 0.5));
        const totalPoints = q.points + timeBonus;
        if (gameState.players[sid]) gameState.players[sid].score += totalPoints;
        results[sid] = { correct: true, points: totalPoints };
      } else {
        results[sid] = { correct: false, points: 0 };
      }
      if (gameState.players[sid]) {
        gameState.players[sid].answers.push({ questionId: q.id, answer: pa.answer, correct: isCorrect });
      }
    }
    for (let sid in gameState.players) {
      if (!gameState.currentAnswers[sid]) {
        gameState.players[sid].answers.push({ questionId: q.id, answer: null, correct: false });
        results[sid] = { correct: false, points: 0, noAnswer: true };
      }
    }
    io.emit('game:results', {
      correctAnswer: q.answer, results,
      stats: { totalAnswered, correctCount, totalPlayers: getPlayerCount() },
      leaderboard: getLeaderboard()
    });
  }

  // ── STUDENT ──
  socket.on('student:join', (data) => {
    const name = data.name.trim().substring(0, 30);
    gameState.players[socket.id] = { name, score: 0, answers: [] };
    socket.emit('student:joined', { name });
    io.to('teachers').emit('game:playerJoined', { id: socket.id, name, playerCount: getPlayerCount() });
    io.emit('game:playerCount', { count: getPlayerCount() });
    if (gameState.phase === 'question') {
      const q = questions[gameState.currentQuestionIndex];
      socket.emit('game:question', {
        id: q.id, category: q.category, type: q.type,
        question: q.question, options: q.options || null,
        points: q.points, timeLimit: q.timeLimit,
        questionNumber: gameState.currentQuestionIndex + 1,
        totalQuestions: questions.length
      });
      socket.emit('game:timer', { timeRemaining: gameState.timeRemaining });
    }
  });

  socket.on('student:answer', (data) => {
    if (gameState.phase !== 'question') return;
    if (gameState.currentAnswers[socket.id]) return;
    gameState.currentAnswers[socket.id] = { answer: data.answer, timestamp: Date.now() };
    socket.emit('student:answerReceived');
    io.to('teachers').emit('game:answerCount', {
      count: Object.keys(gameState.currentAnswers).length, total: getPlayerCount()
    });
  });

  socket.on('disconnect', () => {
    if (gameState.players[socket.id]) {
      const name = gameState.players[socket.id].name;
      delete gameState.players[socket.id];
      io.to('teachers').emit('game:playerLeft', { name, playerCount: getPlayerCount() });
      io.emit('game:playerCount', { count: getPlayerCount() });
    }
    console.log(`- Disconnected: ${socket.id}`);
  });
});

// ============================================================
//  START
// ============================================================
server.listen(PORT, HOST, () => {
  console.log(`
  ============================================
     LAW QUIZ LIVE — Running on port ${PORT}
     Teacher:  /teacher.html
     Students: /student.html
  ============================================
  `);
});

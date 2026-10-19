
import React, { useMemo, useState } from "react";
import "./LearnByInvesting.css";
import {
  lessons,
  quizQuestions,
  learningTips,
} from "../data/learnByInvestingData";

const categories = [
  "All topics",
  ...new Set(lessons.map((lesson) => lesson.category)),
];

export default function LearnByInvesting() {
  const [tab, setTab] = useState("Learn");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All topics");
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [completed, setCompleted] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesCategory =
        category === "All topics" ||
        lesson.category === category;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${lesson.title} ${lesson.description} ${lesson.keyTerms.join(" ")}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const progress = Math.round(
    (completed.length / lessons.length) * 100
  );

  const score = quizQuestions.reduce((total, question) => {
    return total +
      (answers[question.id] === question.correctAnswer
        ? question.points
        : 0);
  }, 0);

  const currentQuestion = quizQuestions[questionIndex];
  const selectedAnswer = answers[currentQuestion?.id];

  function markComplete(id) {
    setCompleted((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  function startQuiz() {
    setAnswers({});
    setQuestionIndex(0);
    setQuizFinished(false);
    setQuizStarted(true);
  }

  function chooseAnswer(index) {
    if (selectedAnswer !== undefined) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: index,
    }));
  }

  function nextQuestion() {
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function openTab(name) {
    setTab(name);
  }

  return (
    <main className="lbi">
      <div className="lbi-shell">

        <header className="lbi-header">
          <div className="lbi-brand">
            <span className="lbi-brand-icon">F+</span>
            <div>
              <strong>FinSpirax</strong>
              <small>LEARN BY INVESTING</small>
            </div>
          </div>

          <span className="lbi-practice">
            <i /> Practice mode · No real money
          </span>
        </header>

        <section className="lbi-hero">
          <div className="lbi-hero-content">
            <span className="lbi-eyebrow">
              YOUR FINANCIAL LEARNING SPACE
            </span>

            <h1>
              Build knowledge.
              <br />
              <em>Not just a portfolio.</em>
            </h1>

            <p>
              Turn simulated trades into practical lessons.
              Understand the concepts behind every decision
              and build your knowledge one step at a time.
            </p>

            <div className="lbi-actions">
              <button
                className="lbi-button lbi-primary"
                onClick={() => openTab("Learn")}
              >
                Explore lessons <span>↗</span>
              </button>

              <button
                className="lbi-button lbi-secondary"
                onClick={() => {
                  openTab("Quiz");
                  startQuiz();
                }}
              >
                Take a quick quiz <span>→</span>
              </button>
            </div>
          </div>

          <div className="lbi-hero-visual">
            <div className="lbi-orbit" />
            <div className="lbi-visual-card">
              <span>Knowledge over time</span>

              <svg viewBox="0 0 320 135" role="img"
                aria-label="Illustration of learning progress">
                {[30, 60, 90, 120].map((y) => (
                  <line
                    key={y}
                    x1="5"
                    y1={y}
                    x2="315"
                    y2={y}
                    stroke="rgba(255,255,255,.12)"
                    strokeDasharray="4 5"
                  />
                ))}

                <path
                  d="M5 110 C35 102 40 80 70 88 S105 60 130 70 S165 40 195 52 S230 25 255 34 S290 13 315 10"
                  fill="none"
                  stroke="#70e0c0"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle cx="315" cy="10" r="5" fill="#70e0c0" />
              </svg>

              <div className="lbi-chart-labels">
                <span>Start</span>
                <span>Keep learning</span>
                <span>Today</span>
              </div>
            </div>

            <div className="lbi-floating-note">
              <span>✦</span>
              <div>
                <small>Your learning journey</small>
                <strong>Every lesson counts</strong>
              </div>
            </div>
          </div>

          <div className="lbi-hero-footer">
            <span>01 — Learn the basics</span>
            <span>02 — Practise with quizzes</span>
            <span>03 — Understand your decisions</span>
          </div>
        </section>

        <section className="lbi-stats">
          <article className="lbi-stat">
            <span className="lbi-stat-icon purple">✦</span>
            <div>
              <small>Lessons completed</small>
              <strong>{completed.length}<i> / {lessons.length}</i></strong>
              <p>Every concept counts</p>
            </div>
          </article>

          <article className="lbi-stat">
            <span className="lbi-stat-icon green">◎</span>
            <div>
              <small>Learning progress</small>
              <strong>{progress}<i>%</i></strong>
              <p>Keep building your skills</p>
              <div className="lbi-progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </article>

          <article className="lbi-stat">
            <span className="lbi-stat-icon orange">★</span>
            <div>
              <small>Quiz points</small>
              <strong>{score}<i> pts</i></strong>
              <p>Earn points by learning</p>
            </div>
          </article>

          <article className="lbi-stat lbi-progress-stat">
            <div
              className="lbi-progress-ring"
              style={{ "--progress": `${progress * 3.6}deg` }}
            >
              <div>{progress}%</div>
            </div>
            <div>
              <small>Your learning path</small>
              <strong className="lbi-progress-label">
                {progress === 100
                  ? "Path complete!"
                  : progress >= 50
                  ? "Great progress"
                  : "Getting started"}
              </strong>
              <p>One lesson at a time</p>
            </div>
          </article>
        </section>

        <nav className="lbi-tabs">
          {["Learn", "Quiz", "Insights"].map((name) => (
            <button
              key={name}
              className={tab === name ? "active" : ""}
              onClick={() => openTab(name)}
            >
              {name === "Learn" ? "▤" : name === "Quiz" ? "◈" : "⌁"}
              {" "}{name}
            </button>
          ))}

          <span className="lbi-tabs-note">
            <i /> Learning matters more than trading
          </span>
        </nav>

        {tab === "Learn" && (
          <section className="lbi-content">
            <div className="lbi-section-heading">
              <div>
                <span className="lbi-eyebrow">THE LEARNING LIBRARY</span>
                <h2>Small lessons. <em>Smarter choices.</em></h2>
                <p>Explore useful investing concepts at your own pace.</p>
              </div>
              <span className="lbi-count">
                {filteredLessons.length} TOPICS
              </span>
            </div>

            <div className="lbi-filters">
              <input
                className="lbi-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕  Search lessons or terms..."
                aria-label="Search lessons"
              />

              <div className="lbi-category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "selected" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="lbi-learning-layout">
              <div className="lbi-lesson-grid">
                {filteredLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`lbi-lesson-card ${
                      selectedLesson.id === lesson.id ? "chosen" : ""
                    }`}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <div className="lbi-lesson-top">
                      <span className="lbi-lesson-icon">
                        {lesson.icon}
                      </span>
                      <span className={
                        completed.includes(lesson.id)
                          ? "lbi-completed-tag"
                          : "lbi-duration"
                      }>
                        {completed.includes(lesson.id)
                          ? "✓ Completed"
                          : lesson.duration}
                      </span>
                    </div>

                    <span className="lbi-category">
                      {lesson.category}
                    </span>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>

                    <div className="lbi-card-bottom">
                      <span>{lesson.difficulty}</span>
                      <span>↗</span>
                    </div>
                  </button>
                ))}

                {filteredLessons.length === 0 && (
                  <div className="lbi-empty">
                    <h3>No lessons found</h3>
                    <p>Try a different search or category.</p>
                    <button onClick={() => {
                      setSearch("");
                      setCategory("All topics");
                    }}>
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <aside className="lbi-detail">
                <span className="lbi-eyebrow">LESSON SPOTLIGHT</span>
                <div className="lbi-detail-icon">
                  {selectedLesson.icon}
                </div>
                <span className="lbi-category">
                  {selectedLesson.category}
                </span>
                <h3>{selectedLesson.title}</h3>
                <p>{selectedLesson.description}</p>

                <div className="lbi-detail-block">
                  <h4>💡 The idea</h4>
                  <p>{selectedLesson.explanation}</p>
                </div>

                <div className="lbi-example">
                  <strong>EXAMPLE</strong>
                  <p>{selectedLesson.example}</p>
                </div>

                <div className="lbi-takeaway">
                  <span>✓</span>
                  <p>
                    <strong>Remember this</strong>
                    <br />
                    {selectedLesson.takeaway}
                  </p>
                </div>

                <div className="lbi-keywords">
                  {selectedLesson.keyTerms.map((term) => (
                    <span key={term}>{term}</span>
                  ))}
                </div>

                <button
                  className="lbi-button lbi-primary lbi-full"
                  onClick={() => markComplete(selectedLesson.id)}
                >
                  {completed.includes(selectedLesson.id)
                    ? "✓ Lesson completed"
                    : "Mark lesson complete"}
                  <span>→</span>
                </button>

                <button
                  className="lbi-inline-link"
                  onClick={() => {
                    setTab("Quiz");
                    startQuiz();
                  }}
                >
                  Test what you've learned ↗
                </button>
              </aside>
            </div>
          </section>
        )}

        {tab === "Quiz" && (
          <section className="lbi-content">
            <div className="lbi-section-heading">
              <div>
                <span className="lbi-eyebrow">PRACTISE & RECALL</span>
                <h2>Knowledge check. <em>Your pace.</em></h2>
                <p>Short questions that help concepts stick.</p>
              </div>
              <span className="lbi-count">
                {quizQuestions.length} QUESTIONS
              </span>
            </div>

            {!quizStarted ? (
              <div className="lbi-quiz-start">
                <div className="lbi-quiz-symbol">✦</div>
                <h3>Put your knowledge to work.</h3>
                <p>
                  Answer {quizQuestions.length} questions about
                  portfolio basics, volatility, and fees. Each
                  correct answer earns learning points.
                </p>
                <button className="lbi-button lbi-primary"
                  onClick={startQuiz}>
                  Start quiz <span>→</span>
                </button>
              </div>
            ) : quizFinished ? (
              <div className="lbi-quiz-start">
                <div className="lbi-quiz-symbol">🏆</div>
                <span className="lbi-eyebrow">QUIZ COMPLETE</span>
                <h3>
                  {score >= 40
                    ? "Excellent learning!"
                    : "Every attempt is progress."}
                </h3>
                <div className="lbi-final-score">
                  {score}
                  <small> / {quizQuestions.length * 10} points</small>
                </div>
                <p>
                  You answered{" "}
                  {quizQuestions.filter(
                    (question) =>
                      answers[question.id] === question.correctAnswer
                  ).length}{" "}
                  of {quizQuestions.length} questions correctly.
                  Review the lessons and try again when you're ready.
                </p>
                <div className="lbi-actions lbi-centered-actions">
                  <button className="lbi-button lbi-primary"
                    onClick={startQuiz}>
                    Try again <span>↻</span>
                  </button>
                  <button className="lbi-button lbi-outline"
                    onClick={() => setTab("Learn")}>
                    Back to lessons
                  </button>
                </div>
              </div>
            ) : (
              <div className="lbi-quiz-card">
                <div className="lbi-quiz-meta">
                  <span>
                    QUESTION {questionIndex + 1} OF {quizQuestions.length}
                  </span>
                  <span>✦ {score} points</span>
                </div>

                <div className="lbi-quiz-track">
                  <span style={{
                    width: `${((questionIndex + 1) /
                      quizQuestions.length) * 100}%`,
                  }} />
                </div>

                <h3>{currentQuestion.question}</h3>

                <div className="lbi-options">
                  {currentQuestion.options.map((option, index) => {
                    const isChosen = selectedAnswer === index;
                    const isCorrect =
                      currentQuestion.correctAnswer === index;
                    const showResult = selectedAnswer !== undefined;

                    let optionClass = "lbi-option";
                    if (isChosen) optionClass += " picked";
                    if (showResult && isCorrect) optionClass += " correct";
                    if (isChosen && !isCorrect) optionClass += " incorrect";

                    return (
                      <button
                        key={option}
                        className={optionClass}
                        disabled={showResult}
                        onClick={() => chooseAnswer(index)}
                      >
                        <span className="lbi-option-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        <span className="lbi-option-mark">
                          {showResult && isCorrect
                            ? "✓"
                            : isChosen
                            ? "•"
                            : "↗"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== undefined && (
                  <div className={
                    `lbi-feedback ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "right"
                        : "wrong"
                    }`
                  }>
                    <strong>
                      {selectedAnswer === currentQuestion.correctAnswer
                        ? "✓ That's right!"
                        : "↻ Not quite—keep learning."}
                    </strong>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="lbi-quiz-footer">
                  <span>Every answer is a chance to learn</span>
                  <button
                    className="lbi-button lbi-primary"
                    disabled={selectedAnswer === undefined}
                    onClick={nextQuestion}
                  >
                    {questionIndex === quizQuestions.length - 1
                      ? "See results"
                      : "Next question"}
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {tab === "Insights" && (
          <section className="lbi-content">
            <div className="lbi-section-heading">
              <div>
                <span className="lbi-eyebrow">READ BETWEEN THE NUMBERS</span>
                <h2>Understand the <em>whole picture.</em></h2>
                <p>Learn what to look for in a simulated portfolio.</p>
              </div>
              <span className="lbi-count">LEARNING GUIDE</span>
            </div>

            <div className="lbi-insights-grid">
              <article className="lbi-insight-card">
                <span className="lbi-insight-icon purple">◉</span>
                <span className="lbi-category">PORTFOLIO BALANCE</span>
                <h3>Concentration</h3>
                <p>
                  If one holding makes up a large share of a
                  portfolio, its performance can have an outsized
                  effect on the overall result.
                </p>
                <div className="lbi-allocation">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="lbi-insight-prompt">
                  <strong>Ask yourself</strong>
                  How much does the largest holding influence the portfolio?
                </div>
              </article>

              <article className="lbi-insight-card">
                <span className="lbi-insight-icon green">⌁</span>
                <span className="lbi-category">PRICE MOVEMENT</span>
                <h3>Volatility</h3>
                <p>
                  Price swings can make results less predictable.
                  Larger movements can mean larger gains or losses.
                </p>
                <div className="lbi-volatility-lines">
                  <span />
                  <span />
                </div>
                <div className="lbi-insight-prompt">
                  <strong>Ask yourself</strong>
                  Am I considering both possible gains and possible losses?
                </div>
              </article>

              <article className="lbi-insight-card">
                <span className="lbi-insight-icon orange">₹</span>
                <span className="lbi-category">NET PERFORMANCE</span>
                <h3>Fees & costs</h3>
                <p>
                  Costs can quietly reduce what remains from a trade.
                  Compare results after fees, not only headline gains.
                </p>
                <div className="lbi-fee-example">
                  <div><span>Gross gain</span><strong>₹200</strong></div>
                  <div><span>Fees</span><strong className="lbi-negative">− ₹25</strong></div>
                  <div className="lbi-net">
                    <span>Net gain</span><strong>₹175</strong>
                  </div>
                </div>
                <div className="lbi-insight-prompt">
                  <strong>Ask yourself</strong>
                  What remains after applicable costs are included?
                </div>
              </article>
            </div>

            <div className="lbi-disclaimer">
              <span>ⓘ</span>
              <p>
                <strong>Learning, not financial advice.</strong>
                {" "}These are educational illustrations, not live
                market data or personal investment recommendations.
                Simulated results do not predict future performance.
              </p>
            </div>

            <div className="lbi-tips">
              <h3>Learning reminders</h3>
              <div>
                {learningTips.map((tip) => (
                  <article key={tip.id}>
                    <span>{tip.icon}</span>
                    <section>
                      <strong>{tip.title}</strong>
                      <p>{tip.description}</p>
                    </section>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="lbi-bottom">
          <div>
            <span className="lbi-eyebrow">A LITTLE KNOWLEDGE GOES A LONG WAY</span>
            <h2>Make every practice trade <em>a lesson.</em></h2>
            <p>Build understanding first. Let curiosity lead your journey.</p>
            <button className="lbi-button lbi-bottom-button"
              onClick={() => setTab("Learn")}>
              Continue learning <span>→</span>
            </button>
          </div>
          <div className="lbi-bottom-mark">F<span>✦</span></div>
        </section>

        <footer className="lbi-footer">
          <div className="lbi-brand">
            <span className="lbi-brand-icon">F+</span>
            <div>
              <strong>FinSpirax</strong>
              <small>LEARN BY INVESTING</small>
            </div>
          </div>
          <p>Learn with curiosity. Practise with care.</p>
          <span>Educational simulation · No real-money trading</span>
        </footer>

      </div>
    </main>
  );
}

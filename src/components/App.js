import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch data when app loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  // ✅ POST new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // ✅ DELETE question
  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  // ✅ PATCH update question
  function handleUpdateQuestion(updated) {
    setQuestions(
      questions.map((q) => (q.id === updated.id ? updated : q))
    );
  }

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(true)}>New Question</button>
        <button onClick={() => setShowForm(false)}>View Questions</button>
      </nav>

      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <section>
          <h1>Quiz Questions</h1>
          <QuestionList
            questions={questions}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        </section>
      )}
    </main>
  );
}

export default App;

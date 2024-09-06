// pages/models/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getModelById } from "@/app/APIs/Models/Model"; // Ensure this import path is correct

const ModelDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the model ID from the URL
  const [model, setModel] = useState(null);
  const [mode, setMode] = useState(""); // Track whether the user chooses practice or read mode
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplanations, setShowExplanations] = useState({}); // Track show/hide state for explanations

  // Pagination for the question navigation grid
  const [navPage, setNavPage] = useState(1);
  const navItemsPerPage = 10; // Number of question numbers to show per page

  // Pagination for Answers & Explanations
  const [answersPage, setAnswersPage] = useState(1);
  const [answersPerPage, setAnswersPerPage] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchModel = async () => {
        try {
          const data = await getModelById(id);
          setModel(data);
          setTimeLeft(data.totalTime * 60); // Set the countdown time in seconds if needed
        } catch (error) {
          console.error("Error fetching model details:", error);
        }
      };
      fetchModel();
    }
  }, [id]);

  useEffect(() => {
    // Countdown timer logic for practice mode
    if (timeLeft > 0 && !isSubmitted && mode === "practice") {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted && mode === "practice") {
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timeLeft, isSubmitted, mode]);

  // Handle selecting an answer in practice mode
  const handleSelectAnswer = (questionId, optionId) => {
    if (!isSubmitted && !selectedAnswers[questionId]) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: optionId,
      }));
    }
  };

  // Handle flagging/unflagging questions in practice mode
  const handleFlagQuestion = (questionId) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Handle submission of answers in practice mode
  const handleSubmit = () => {
    if (isSubmitted || timeLeft === 0) return;

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    model.questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.rightAnswer) {
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    });

    setScore(correctAnswers); // Set the score
    setCorrectCount(correctAnswers); // Set the correct answers count
    setIncorrectCount(incorrectAnswers); // Set the incorrect answers count
    setIsSubmitted(true);
  };

  // Navigate directly to a specific question in practice mode
  const navigateToQuestion = (questionIndex) => {
    const pageNumber = Math.ceil((questionIndex + 1) / questionsPerPage);
    setCurrentPage(pageNumber);
  };

  // Handle change in questions per page
  const handleQuestionsPerPageChange = (newQuestionsPerPage) => {
    setQuestionsPerPage(newQuestionsPerPage);
    setCurrentPage(1); // Reset to the first page to avoid out-of-bound errors
  };

  // Format time for display (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Pagination for Answers & Explanations
  const indexOfLastAnswer = answersPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = model?.questions.slice(
    indexOfFirstAnswer,
    indexOfLastAnswer
  );
  const totalAnswersPages = Math.ceil(model?.questions.length / answersPerPage);

  const handleAnswersNext = () => {
    if (answersPage < totalAnswersPages) setAnswersPage(answersPage + 1);
  };

  const handleAnswersPrev = () => {
    if (answersPage > 1) setAnswersPage(answersPage - 1);
  };

  // Handle change in answers per page
  const handleAnswersPerPageChange = (newAnswersPerPage) => {
    setAnswersPerPage(newAnswersPerPage);
    setAnswersPage(1); // Reset to the first page when changing the number of answers per page
  };

  // Toggle the explanation display for a specific question
  const toggleExplanation = (questionId) => {
    setShowExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (!model) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  // Render based on mode selection
  if (!mode) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded shadow-md">
        <h1 className="text-2xl font-bold">{model.name}</h1>
        <p className="mt-2 text-gray-600">{model.description}</p>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => setMode("practice")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Practice Model Test
          </button>
          <button
            onClick={() => setMode("read")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
          >
            Read Model Test
          </button>
        </div>
      </div>
    );
  }

  // Render Read Model Test mode
  if (mode === "read") {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded shadow-md">
        <h1 className="text-2xl font-bold">{model.name}</h1>
        <p className="mt-2 text-gray-600">{model.description}</p>
        <div className="flex items-center justify-between mt-4">
          <label className="text-gray-700">
            Questions per page:
            <select
              value={answersPerPage}
              onChange={(e) =>
                handleAnswersPerPageChange(Number(e.target.value))
              }
              className="ml-2 p-2 border border-gray-300 rounded"
            >
              {[1, 2, 3, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center">
            <button
              onClick={handleAnswersPrev}
              disabled={answersPage === 1}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 mr-2"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {answersPage} of {totalAnswersPages}
            </span>
            <button
              onClick={handleAnswersNext}
              disabled={answersPage === totalAnswersPages}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 ml-2"
            >
              Next
            </button>
          </div>
        </div>
        <ul className="mt-4 space-y-4">
          {currentAnswers.map((question, index) => (
            <li
              key={question._id}
              className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {index + 1 + (answersPage - 1) * answersPerPage}.{" "}
                {question.title}
              </h3>
              <ul className="pl-4 mt-2 space-y-2">
                {question.options.map((option) => (
                  <li
                    key={option._id}
                    className="p-2 border border-gray-200 rounded"
                  >
                    {option.order}. {option.title}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => toggleExplanation(question._id)}
                className="mt-2 text-blue-500 text-sm"
              >
                {showExplanations[question._id]
                  ? "Hide Explanation"
                  : "Show Explanation"}
              </button>
              {showExplanations[question._id] && (
                <p className="mt-2 text-sm text-gray-500">
                  Explanation: {question.explanation}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render Practice Model Test mode
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-white border border-gray-200 rounded shadow-md">
        <h1 className="text-2xl font-bold">{model.name}</h1>
        <p className="mt-2 text-gray-600">{model.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600">
            Time Left:{" "}
            <span
              className={`font-bold ${
                timeLeft <= 10 ? "text-red-500" : "text-green-600"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </p>
          <label className="text-gray-700">
            Questions per page:
            <select
              value={questionsPerPage}
              onChange={(e) =>
                handleQuestionsPerPageChange(Number(e.target.value))
              }
              className="ml-2 p-2 border border-gray-300 rounded"
              disabled={isSubmitted}
            >
              {[1, 2, 3, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Display Questions */}
        {!isSubmitted && (
          <ul className="mt-4 space-y-4">
            {model.questions
              .slice(
                (currentPage - 1) * questionsPerPage,
                currentPage * questionsPerPage
              )
              .map((question, index) => (
                <li
                  key={question._id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {index + 1 + (currentPage - 1) * questionsPerPage}.{" "}
                      {question.title}
                    </h3>
                    <button
                      onClick={() => handleFlagQuestion(question._id)}
                      className={`text-sm px-2 py-1 rounded ${
                        flaggedQuestions[question._id]
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {flaggedQuestions[question._id] ? "Unflag" : "Flag"}
                    </button>
                  </div>

                  <ul className="pl-4 mt-2 space-y-2">
                    {question.options.map((option) => {
                      const isSelected =
                        selectedAnswers[question._id] === option.order;

                      return (
                        <li
                          key={option._id}
                          className={`p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 ${
                            isSelected ? "bg-blue-100 border-blue-400" : ""
                          }`}
                          onClick={() =>
                            handleSelectAnswer(question._id, option.order)
                          }
                        >
                          {option.order}. {option.title}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
          </ul>
        )}

        {/* Pagination Navigation */}
        {!isSubmitted && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1 || isSubmitted}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil(model.questions.length / questionsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                  Math.ceil(model.questions.length / questionsPerPage) ||
                isSubmitted
              }
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitted || timeLeft === 0}
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Submit
          </button>
        )}

        {/* Show Score and Results After Submission */}
        {isSubmitted && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded shadow-md">
            <h2 className="text-xl font-bold">Your Score: {score}</h2>
            <p className="text-gray-700">Correct Answers: {correctCount}</p>
            <p className="text-gray-700">Incorrect Answers: {incorrectCount}</p>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {showAnswers
                ? "Hide Answers & Explanations"
                : "View Answers & Explanations"}
            </button>
          </div>
        )}

        {/* Display Questions with Marked Answers and Explanations */}
        {isSubmitted && showAnswers && (
          <div>
            <div className="flex items-center justify-between mt-4">
              <label className="text-gray-700">
                Answers per page:
                <select
                  value={answersPerPage}
                  onChange={(e) =>
                    handleAnswersPerPageChange(Number(e.target.value))
                  }
                  className="ml-2 p-2 border border-gray-300 rounded"
                >
                  {[1, 2, 3, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center">
                <button
                  onClick={handleAnswersPrev}
                  disabled={answersPage === 1}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {answersPage} of {totalAnswersPages}
                </span>
                <button
                  onClick={handleAnswersNext}
                  disabled={answersPage === totalAnswersPages}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 ml-2"
                >
                  Next
                </button>
              </div>
            </div>
            <ul className="mt-4 space-y-4">
              {currentAnswers.map((question, index) => (
                <li
                  key={question._id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
                >
                  <h3 className="text-lg font-semibold">
                    {index + 1 + (answersPage - 1) * answersPerPage}.{" "}
                    {question.title}
                  </h3>

                  <ul className="pl-4 mt-2 space-y-2">
                    {question.options.map((option) => {
                      const isCorrect = option.order === question.rightAnswer;
                      const isSelected =
                        selectedAnswers[question._id] === option.order;

                      return (
                        <li
                          key={option._id}
                          className={`p-2 border rounded ${
                            isCorrect
                              ? "bg-green-100 border-green-400"
                              : isSelected && !isCorrect
                              ? "bg-red-100 border-red-400"
                              : "border-gray-200"
                          }`}
                        >
                          {option.order}. {option.title}
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    onClick={() => toggleExplanation(question._id)}
                    className="mt-2 text-blue-500 text-sm"
                  >
                    {showExplanations[question._id]
                      ? "Hide Explanation"
                      : "Show Explanation"}
                  </button>
                  {showExplanations[question._id] && (
                    <p className="mt-2 text-sm text-gray-500">
                      Explanation: {question.explanation}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Navigation for Flagged Questions */}
      <div className="w-40 p-4 bg-gray-50 border-l border-gray-200">
        <h3 className="text-md font-semibold text-center">Questions</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {model.questions.map((question, index) => (
            <button
              key={question._id}
              onClick={() => navigateToQuestion(index)}
              className={`p-1 rounded ${
                flaggedQuestions[question._id]
                  ? "bg-yellow-200"
                  : "bg-gray-100"
              } border ${
                index + 1 === currentPage
                  ? "border-blue-500"
                  : "border-gray-300"
              } hover:bg-gray-200 text-sm`}
            >
              {index + 1}
              {flaggedQuestions[question._id] && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;

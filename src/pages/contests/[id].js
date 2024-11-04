// pages/contests/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContestById } from "@/app/APIs/Contests/Contest"; // Ensure this import is correct
import React from "react";
import SpinnerCustom from "@/Components/SpinnerCustom";
import { getButtonStyle, getInputStyle, getLabelStyle } from "@/Utils/helper";

const ContestDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the contest ID from the URL
  const [isLoading, setIsLoading] = useState(true)
  const [contest, setContest] = useState(null);
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

  // Pagination for the question navigation grid
  const [navPage, setNavPage] = useState(1);
  const navItemsPerPage = 10; // Number of question numbers to show per page

  // Pagination for Answers & Explanations
  const [answersPage, setAnswersPage] = useState(1);
  const [answersPerPage, setAnswersPerPage] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchContest = async () => {
        try {
          const data = await getContestById(id);
          setContest(data);
          setTimeLeft((data?.totalTime || 1) * 60); // Set the countdown time in seconds
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching contest details:", error);
        }
      };
      fetchContest();
    }
  }, [id]);

  useEffect(() => {
    // Countdown timer logic
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timeLeft, isSubmitted]);

  // Handle page changes
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = contest?.questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(contest?.questions.length / questionsPerPage);

  // Handle selecting an answer
  const handleSelectAnswer = (questionId, optionId) => {
    if (!isSubmitted && !selectedAnswers[questionId]) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: optionId,
      }));
    }
  };

  // Handle flagging/unflagging questions
  const handleFlagQuestion = (questionId) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Handle submission of answers
  const handleSubmit = () => {
    if (isSubmitted || timeLeft === 0) return;

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    contest.questions.forEach((question) => {
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

  // Navigate directly to a specific question
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

  // Calculate pagination for navigation grid
  const indexOfLastNavItem = navPage * navItemsPerPage;
  const indexOfFirstNavItem = indexOfLastNavItem - navItemsPerPage;
  const currentNavItems = contest?.questions.slice(
    indexOfFirstNavItem,
    indexOfLastNavItem
  );
  const navTotalPages = Math.ceil(contest?.questions.length / navItemsPerPage);

  const handleNavNext = () => {
    if (navPage < navTotalPages) setNavPage(navPage + 1);
  };

  const handleNavPrev = () => {
    if (navPage > 1) setNavPage(navPage - 1);
  };

  // Pagination for Answers & Explanations
  const indexOfLastAnswer = answersPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = contest?.questions.slice(
    indexOfFirstAnswer,
    indexOfLastAnswer
  );
  const totalAnswersPages = Math.ceil(contest?.questions.length / answersPerPage);

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

  if (isLoading || !contest) {
    return <SpinnerCustom />; // Show loading state while fetching data
  }


  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-white border border-gray-200 rounded shadow-md">
        <div className="contest-title flex justify-between">
          <div className="contest-title-desc">
            <h1 className="text-2xl font-bold">{contest.name}</h1>
            <p className="mt-2 text-gray-600">{contest.description}</p>
          </div>
          <div className="contest-timer">
            <p className="text-gray-600 text-right">
              <span
                className={`font-bold text-xl ${timeLeft <= 10 ? "text-red-500" : "text-green-600"
                  }`}
              >
                {formatTime(timeLeft)}
              </span>
            </p>
            <div className="justify-between mt-4">
              <div className="text-gray-700 gap-2 grid grid-cols-[1fr_auto] items-center">
                <label className={getLabelStyle()}>Questions per page:</label>
                <select
                  value={questionsPerPage}
                  onChange={(e) =>
                    handleQuestionsPerPageChange(Number(e.target.value))
                  }
                  className={getInputStyle()}
                  disabled={isSubmitted}
                >
                  {[1, 2, 3, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>


        {/* Display Questions */}
        {!isSubmitted && (
          <ul className="mt-10 space-y-4">
            {currentQuestions.map((question) => (
              <li
                key={question._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{question.title}</h3>
                  <button
                    onClick={() => handleFlagQuestion(question._id)}
                    className={`text-sm px-2 py-1 rounded ${flaggedQuestions[question._id]
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-300 text-black"
                      }`}
                  >
                    {flaggedQuestions[question._id] ? "Unflag" : "Flag"}
                  </button>
                </div>

                <ul className="mt-5 space-y-2">
                  {question.options.map((option) => {
                    const isSelected =
                      selectedAnswers[question._id] === option.order;

                    return (
                      <li
                        key={option._id}
                        className={`px-4 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-blue-100 border-blue-400" : ""
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
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || isSubmitted}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="my-4 text-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitted || timeLeft === 0}
              className={getButtonStyle()}
            >
              Submit
            </button>
          </div>
          
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
              {currentAnswers.map((question) => (
                <li
                  key={question._id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{question.title}</h3>

                  <ul className="pl-4 mt-2 space-y-2">
                    {question.options.map((option) => {
                      const isCorrect = option.order === question.rightAnswer;
                      const isSelected =
                        selectedAnswers[question._id] === option.order;

                      return (
                        <li
                          key={option._id}
                          className={`p-2 border rounded ${isCorrect
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

                  <p className="mt-2 text-sm text-gray-500">
                    Explanation: {question.explanation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="w-40 p-4 bg-gray-50 border-l border-gray-200">
        <h3 className="text-md font-semibold text-center">Questions</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {currentNavItems?.map((_, index) => (
            <button
              key={index + indexOfFirstNavItem}
              onClick={() => navigateToQuestion(index + indexOfFirstNavItem)}
              className={`p-2 rounded ${flaggedQuestions[contest.questions[index + indexOfFirstNavItem]._id]
                  ? "bg-yellow-200"
                  : "bg-gray-100"
                } border ${index + 1 === currentPage
                  ? "border-blue-500"
                  : "border-gray-300"
                } hover:bg-gray-200 text-sm`}
            >
              {index + 1 + indexOfFirstNavItem}
              {flaggedQuestions[contest.questions[index + indexOfFirstNavItem]._id] && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Pagination */}
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleNavPrev}
            disabled={navPage === 1}
            className="text-xs px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          <button
            onClick={handleNavNext}
            disabled={navPage === navTotalPages}
            className="text-xs px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;

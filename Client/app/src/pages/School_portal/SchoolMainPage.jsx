import React, { useState, useEffect } from 'react';
import useTokenStore from '../../stores/useTokenStore';
import {  createSchoolCourse,
          getMyCourses, 
          getCourseDetails, 
          addCourseMaterial, 
          addCourseAssessment, 
          addAssessmentQuestion,
          getAssessmentQuestions,
          enrollStudentInCourse,
          getStudentCourses,
          submitAssessmentAnswers,
          } from '../../api/school';

const SchoolMainPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState({ materials: [], assessments: [] });
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const token = useTokenStore((state) => state.token);
  const role = useTokenStore((state) => state.role); // ✅ Get role cleanly
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [materialLink, setMaterialLink] = useState('');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');
  const [assessmentDueDate, setAssessmentDueDate] = useState('');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [mcqOptions, setMcqOptions] = useState(['']);
  const [activeAssessmentId, setActiveAssessmentId] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isViewQuestionsModalOpen, setIsViewQuestionsModalOpen] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollEmail, setEnrollEmail] = useState('');
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [answerFiles, setAnswerFiles] = useState({});
  const [quizScore, setQuizScore] = useState(null);  // { score, total }
  const [quizScores, setQuizScores] = useState({}); // { [assessmentId]: {score, total} }



  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = role === 'student'
          ? await getStudentCourses(token)
          : await getMyCourses(token);
  
        setCourses(data);
      } catch (error) {
        console.error('Error loading courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
  
    if (token && role) loadCourses();
  }, [token, role]);
  

  const handleCourseClick = async (courseId) => {
    setSelectedCourse(courseId);
    setContentLoading(true);
    try {
      const content = await getCourseDetails(token, courseId);
      setCourseContent(content);
    } catch (error) {
      console.error('Error loading course content:', error);
      setError('Failed to load course content');
    } finally {
      setContentLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourseName.trim()) {
      alert('Course name is required');
      return;
    }
    try {
      const response = await createSchoolCourse(token, {
        name: newCourseName,
        description: newCourseDescription,
      });
      setCourses([...courses, { id: response.course_id, name: newCourseName, description: newCourseDescription }]);
      setNewCourseName('');
      setNewCourseDescription('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleAddMaterial = async () => {
    if (!materialTitle.trim()) {
      alert("Title is required.");
      return;
    }
    try {
      await addCourseMaterial(token, selectedCourse, {
        title: materialTitle,
        description: materialDescription,
        link: materialLink,
      });
  
      // Refresh course content
      const updated = await getCourseDetails(token, selectedCourse);
      setCourseContent(updated);
  
      // Reset + close modal
      setMaterialTitle('');
      setMaterialDescription('');
      setMaterialLink('');
      setIsMaterialModalOpen(false);
    } catch (error) {
      console.error("Failed to add material:", error);
      alert("Error adding material");
    }
  };  

  const handleAddAssessment = async () => {
    if (!assessmentTitle.trim()) {
      alert("Title is required.");
      return;
    }
    try {
      await addCourseAssessment(token, selectedCourse, {
        title: assessmentTitle,
        description: assessmentDescription,
        due_date: assessmentDueDate,
      });
  
      const updated = await getCourseDetails(token, selectedCourse);
      setCourseContent(updated);
  
      // Reset modal
      setAssessmentTitle('');
      setAssessmentDescription('');
      setAssessmentDueDate('');
      setIsAssessmentModalOpen(false);
    } catch (error) {
      console.error("Failed to add assessment:", error);
      alert("Error adding assessment");
    }
  };

  const handleAddQuestion = async () => {
    if (!questionText.trim()) return alert('Question text is required');
  
    let payload = {
      question_text: questionText,
      question_type: questionType,
      correct_answer: correctAnswer || null,
    };
  
    if (questionType === 'mcq') {
      const cleaned = mcqOptions.filter(opt => opt.trim() !== '');
      if (cleaned.length < 2) return alert('At least two MCQ options required');
      payload.options = cleaned;
    }
  
    try {
      await addAssessmentQuestion(token, activeAssessmentId, payload);
      alert('Question added ✅');
      setQuestionText('');
      setCorrectAnswer('');
      setQuestionType('text');
      setMcqOptions(['']);
      setIsQuestionModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Error adding question');
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">🎓 School Portal - Courses</h1>
  
      {role === 'teacher' && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            ➕ Create New Course
          </button>
        </div>
      )}
  
      {/* Create Course Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Create a New Course</h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Course Description"
              value={newCourseDescription}
              onChange={(e) => setNewCourseDescription(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCreateCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Course List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {courses.length > 0 ? (
  courses.map((course) => (
    <div
      key={course.id}
      className={`cursor-pointer p-6 rounded-xl shadow-lg border transition-all ${
        selectedCourse === course.id
          ? "bg-blue-600 text-white"
          : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
      }`}
    >
      <div onClick={() => handleCourseClick(course.id)}>
        <h2 className="text-xl font-bold mb-2">{course.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
      </div>

      {(role === 'teacher' || role === 'admin') && (
        <button
          onClick={() => {
            setActiveCourseId(course.id);
            setIsEnrollModalOpen(true);
          }}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          📥 Enroll Student
        </button>
      )}
    </div>
  ))
) : (
  <p className="text-center col-span-full text-gray-500">
    No courses available yet.
  </p>
)}

          
        </div>        
      )}
      {/* Course Details */}
      {selectedCourse && (
  <div className="mt-8">
    {contentLoading ? (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500 border-solid"></div>
      </div>
    ) : (
      <>
        {/* 🔙 Back button */}
        <div className="mb-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            🔙 Back to My Courses
          </button>
        </div>

        

        <h2 className="text-2xl font-bold mb-4">📖 Course Content</h2>

        {/* Materials */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">📚 Materials</h3>
            {role === 'teacher' && (
              <button
                onClick={() => setIsMaterialModalOpen(true)}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                ➕ Add Material
              </button>
            )}
          </div>

          {courseContent.materials.length > 0 ? (
            <ul className="space-y-3">
              {courseContent.materials.map((material) => (
                <li key={material.id} className="bg-gray-800 p-4 rounded-lg shadow text-white">
                  <h4 className="text-lg font-semibold mb-1">{material.title}</h4>
                  {material.description && (
                    <p className="text-sm text-gray-300 mb-2">{material.description}</p>
                  )}
                  {material.link && (
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      🔗 Open Resource
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No materials yet for this course.</p>
          )}
        </div>

        {/* Assessments */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">📝 Assignments</h3>
            {role === 'teacher' && (
              <button
                onClick={() => setIsAssessmentModalOpen(true)}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                ➕ Add Assignment
              </button>
            )}
          </div>

          {courseContent.assessments.length > 0 ? (
            <ul className="space-y-3">
              {courseContent.assessments.map((assessment) => (
                <li key={assessment.id} className="bg-gray-800 p-4 rounded-lg shadow text-white flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{assessment.title}</h4>
                    {assessment.description && (
                      <p className="text-sm text-gray-300">{assessment.description}</p>
                    )}
                    {assessment.due_date && (
                      <p className="text-sm text-gray-400">Due: {assessment.due_date}</p>
                    )}
                  </div>

                  {role === 'teacher' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setActiveAssessmentId(assessment.id);
                          setIsQuestionModalOpen(true);
                        }}
                        className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                      >
                        ➕ Add Question
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const data = await getAssessmentQuestions(token, assessment.id);
                            setQuestionsList(data);
                            setActiveAssessmentId(assessment.id);
                            setIsViewQuestionsModalOpen(true);
                          } catch (err) {
                            alert('Failed to load questions');
                          }
                        }}
                        className="text-sm bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        🧾 View Questions
                      </button>
                    </div>
                  )}

{role === 'student' && (
  <div className="flex flex-col items-end space-y-1">
    {quizScores[assessment.id] ? (
      <span className="text-sm text-green-400">
        ✅ Score: {quizScores[assessment.id].score} / {quizScores[assessment.id].total}
      </span>
    ) : (
      <button
        onClick={async () => {
          try {
            const data = await getAssessmentQuestions(token, assessment.id);
            setQuizQuestions(data);
            setActiveAssessmentId(assessment.id);
            setIsSolveModalOpen(true);
          } catch (err) {
            setError("You already submitted this quiz or it is unavailable.");
          }
        }}
        className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        🧠 Solve
      </button>
    )}
  </div>
)}


                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No assessments yet for this course.</p>
          )}
        </div>
      </>
    )}
  </div>
)}

  
      {/* Add Material Modal */}
      {isMaterialModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Material</h2>
            <input
              type="text"
              placeholder="Title"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Description"
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="url"
              placeholder="Link (optional)"
              value={materialLink}
              onChange={(e) => setMaterialLink(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddMaterial}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add
              </button>
              <button
                onClick={() => setIsMaterialModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Assessment Modal */}
      {isAssessmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Assessment</h2>
            <input
              type="text"
              placeholder="Title"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Description"
              value={assessmentDescription}
              onChange={(e) => setAssessmentDescription(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="date"
              value={assessmentDueDate}
              onChange={(e) => setAssessmentDueDate(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddAssessment}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add
              </button>
              <button
                onClick={() => setIsAssessmentModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isQuestionModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Add Question</h2>

      <input
        type="text"
        placeholder="Question text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />

      <select
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="text">Text Answer</option>
        <option value="mcq">Multiple Choice</option>
        <option value="file">File Upload</option>
      </select>

      {(questionType === 'text' || questionType === 'mcq') && (
      <input
        type="text"
        placeholder="Correct answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="w-full mb-3 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
    )}


      {questionType === 'mcq' && (
        <div className="mb-4 space-y-2">
          {mcqOptions.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...mcqOptions];
                newOpts[i] = e.target.value;
                setMcqOptions(newOpts);
              }}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          ))}
          <button
            onClick={() => setMcqOptions([...mcqOptions, ''])}
            className="text-sm text-indigo-400 hover:underline"
          >
            ➕ Add another option
          </button>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleAddQuestion}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add
        </button>
        <button
          onClick={() => setIsQuestionModalOpen(false)}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    {isViewQuestionsModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Assessment Questions</h2>
      {questionsList.length > 0 ? (
        <ul className="space-y-4">
          {questionsList.map((q, i) => (
            <li key={q.id} className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
              <p><strong>Q{i + 1}:</strong> {q.question_text}</p>
              <p className="text-sm text-gray-500">Type: {q.question_type}</p>
              {q.options && (
                <div className="text-sm text-gray-400">
                  <strong>Options:</strong> {q.options.join(', ')}
                </div>
              )}
              {q.correct_answer && (
                <p className="text-green-500 text-sm">
                  ✅ Correct: {q.correct_answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No questions added yet.</p>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsViewQuestionsModalOpen(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
        {isEnrollModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Enroll Student</h2>
      <input
        type="email"
        placeholder="Student email"
        value={enrollEmail}
        onChange={(e) => setEnrollEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="flex justify-between">
        <button
          onClick={async () => {
            try {
              await enrollStudentInCourse(token, activeCourseId, enrollEmail);
              alert("Student enrolled successfully ✅");
              setEnrollEmail('');
              setIsEnrollModalOpen(false);
            } catch (err) {
              console.error(err);
              alert("Enrollment failed: " + err.message);
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Enroll
        </button>
        <button
          onClick={() => setIsEnrollModalOpen(false)}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    {isSolveModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Take Quiz</h2>

      {quizQuestions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold">{q.question_text}</p>
          <p className="text-sm text-gray-400 mb-2">({q.question_type})</p>

          {q.question_type === 'text' && (
            <textarea
              rows={2}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setStudentAnswers((prev) => ({
                  ...prev,
                  [q.id]: e.target.value,
                }))
              }
            />
          )}

          {q.question_type === 'mcq' && (
            <div className="space-y-2 mt-1">
              {q.options.map((opt, i) => (
                <label key={i} className="block text-sm">
                  <input
                    type="radio"
                    name={`mcq_${q.id}`}
                    value={opt}
                    onChange={(e) =>
                      setStudentAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                  />
                  <span className="ml-2">{opt}</span>
                </label>
              ))}
            </div>
          )}

          {q.question_type === 'file' && (
            <input
              type="file"
              className="w-full mt-1"
              onChange={(e) =>
                setAnswerFiles((prev) => ({
                  ...prev,
                  [q.id]: e.target.files[0],
                }))
              }
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setIsSolveModalOpen(false);
            setQuizQuestions([]);
            setStudentAnswers({});
            setAnswerFiles({});
          }}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          onClick={async () => {
            try {
              const payload = quizQuestions.map((q) => ({
                question_id: q.id,
                text_answer: studentAnswers[q.id] || '',
              }));

              const result = await submitAssessmentAnswers(token, activeAssessmentId, payload, answerFiles);
              setQuizScores((prev) => ({
              ...prev,
              [activeAssessmentId]: { score: result.score, total: result.total },
            }));


              setIsSolveModalOpen(false);
              setQuizQuestions([]);
              setStudentAnswers({});
              setAnswerFiles({});
            } catch (err) {
              alert("Submission failed ❌");
              console.error(err);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
  
};

export default SchoolMainPage;
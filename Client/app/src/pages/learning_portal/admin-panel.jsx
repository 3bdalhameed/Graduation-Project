import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar_logon/navbar";
import ReactMarkdown from "react-markdown";

const AdminAssessmentsPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [isCreatingMaterial, setIsCreatingMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialForm, setMaterialForm] = useState({ title: "", category: "", description: "", link: "" });
  const [mcqList, setMcqList] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
  const [formData, setFormData] = useState({ name: "", category: "", difficulty: "Easy" });
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assessments/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((err) => console.error("Failed to load assessments", err));
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/assessments/${id}/delete/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssessments(assessments.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setFormData({
      name: assessment.name,
      category: assessment.category,
      difficulty: assessment.difficulty,
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({ name: "", category: "", difficulty: "Easy" });
    setMcqList([{ question: "", options: ["", "", "", ""], answer: "" }]);
    setIsCreating(true);
  };

  const handleMcqChange = (index, field, value) => {
    const updated = [...mcqList];
    if (field === "question" || field === "answer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setMcqList(updated);
  };

  const addMcq = () => {
    setMcqList([...mcqList, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing
      ? `http://127.0.0.1:8000/api/assessments/${selectedAssessment.id}/edit/`
      : "http://127.0.0.1:8000/api/assessments/";

    const payload = {
      name: formData.name,
      category: formData.category,
      difficulty: formData.difficulty,
      questions: mcqList.map((q) => ({
        question: q.question,
        option1: q.options[0] || "",
        option2: q.options[1] || "",
        option3: q.options[2] || "",
        option4: q.options[3] || "",
        answer: q.answer,
      })),
    };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (isEditing) {
        setAssessments(
          assessments.map((a) => (a.id === data.id ? data : a))
        );
        setIsEditing(false);
        setSelectedAssessment(null);
      } else {
        setAssessments([...assessments, data]);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Submit failed", error);
    }
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assessments/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((err) => console.error("Failed to load assessments", err));

    fetch("http://127.0.0.1:8000/api/learning-materials/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Failed to load materials", err));
  }, [token]);

  const handleDeleteMaterial = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/learning-materials/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(materials.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete material", err);
    }
  };

  const handleEditMaterial = (material) => {
    setSelectedMaterial(material);
    setMaterialForm(material);
    setIsEditingMaterial(true);
  };

  const handleCreateMaterial = () => {
    setMaterialForm({ title: "", category: "", description: "", link: "" });
    setIsCreatingMaterial(true);
  };

  const handleSubmitMaterial = async (e) => {
    e.preventDefault();
    const method = isEditingMaterial ? "PUT" : "POST";
    const url = isEditingMaterial
      ? `http://127.0.0.1:8000/api/learning-materials/${selectedMaterial.id}/`
      : "http://127.0.0.1:8000/api/learning-materials/";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialForm),
      });
      const data = await res.json();
      if (isEditingMaterial) {
        setMaterials(materials.map((m) => (m.id === data.id ? data : m)));
      } else {
        setMaterials([...materials, data]);
      }
      setIsCreatingMaterial(false);
      setIsEditingMaterial(false);
    } catch (err) {
      console.error("Failed to submit material", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            🧠 Manage Assessments
          </h1>
          <div className="flex justify-end mb-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={handleCreate}
            >
              ➕ New Assessment
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-2"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {assessment.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Category: {assessment.category}</p>
                <p className="text-gray-600 dark:text-gray-400">Difficulty: {assessment.difficulty}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(assessment)}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assessment.id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(isEditing || isCreating) && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                  {isEditing ? "✏️ Edit Assessment" : "➕ Create New Assessment"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
                  />
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <button
                    type="button"
                    onClick={addMcq}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    ➕ Add Question
                  </button>
                  {mcqList.map((mcq, index) => (
                    <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 space-y-2">
                      <input
                        type="text"
                        placeholder={`Question ${index + 1}`}
                        value={mcq.question}
                        onChange={(e) => handleMcqChange(index, "question", e.target.value)}
                        className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                      />
                      {mcq.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          placeholder={`Option ${optIndex + 1}`}
                          value={opt}
                          onChange={(e) => handleMcqChange(index, optIndex, e.target.value)}
                          className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                        />
                      ))}
                      <input
                        type="text"
                        placeholder="Correct Answer"
                        value={mcq.answer}
                        onChange={(e) => handleMcqChange(index, "answer", e.target.value)}
                        className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white border"
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold"
                    >
                      💾 Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setIsEditing(false);
                        setSelectedAssessment(null);
                      }}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl"
                    >
                      ✖ Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pt-24 px-6 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            📚 Manage Learning Materials
          </h1>
          <div className="flex justify-end mb-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={handleCreateMaterial}
            >
              ➕ New Material
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {material.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Category: {material.category}</p>
                <div className="prose dark:prose-invert text-sm mt-2">
                  <ReactMarkdown>{material.description}</ReactMarkdown>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEditMaterial(material)}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(isCreatingMaterial || isEditingMaterial) && (
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                  {isEditingMaterial ? "✏️ Edit Material" : "➕ Create Material"}
                </h2>
                <form onSubmit={handleSubmitMaterial} className="space-y-4">
                  <input type="text" placeholder="Title" value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border" />
                  <input type="text" placeholder="Category" value={materialForm.category} onChange={(e) => setMaterialForm({ ...materialForm, category: e.target.value })} className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border" />
                  <textarea placeholder="Description (Markdown supported)" value={materialForm.description} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })} className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border" rows="6" />
                  <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border overflow-y-auto prose dark:prose-invert">
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Preview</h3>
                    <ReactMarkdown>{materialForm.description}</ReactMarkdown>
                  </div>
                  <input type="url" placeholder="Material Link" value={materialForm.link} onChange={(e) => setMaterialForm({ ...materialForm, link: e.target.value })} className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border" />
                  <div className="flex gap-2">
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold">
                      💾 Save
                    </button>
                    <button type="button" onClick={() => { setIsCreatingMaterial(false); setIsEditingMaterial(false); }} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl">
                      ✖ Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default AdminAssessmentsPage;

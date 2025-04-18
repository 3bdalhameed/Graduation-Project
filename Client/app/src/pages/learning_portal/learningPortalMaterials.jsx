import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/learning_Navbar_logon/navbar";

export default function LearningMaterials() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch("http://127.0.0.1:8000/api/learning-materials/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Failed to fetch materials", err));
  }, []);

  const categories = [
    "All",
    "Introduction",
    "Web Security",
    "Digital Forensics",
    "Crypto",
    "Reverse Engineering",
    "Binary Exploitation",
  ];

  const filteredMaterials = selectedCategory === "All"
    ? materials
    : materials.filter((material) => material.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex">
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 p-6 shadow-xl pt-24">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2 border-blue-500">Categories</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full py-2 px-4 rounded-xl text-left font-semibold tracking-wide transition duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-10 pt-24">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12 drop-shadow-md">
            📘 Cybersecurity & CTF Learning Hub
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 hover:scale-[1.03] hover:shadow-2xl transform transition duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                onClick={() => navigate(material.link)}
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {material.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {material.description}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Read More →
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

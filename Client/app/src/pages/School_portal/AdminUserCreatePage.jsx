import React, { useState, useEffect } from "react";
import useTokenStore from "../../stores/useTokenStore";
import { fetchStudents, fetchClasses, createTeacher, createStudent } from "../../api/school";

const AdminUserCreatePage = () => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const token = useTokenStore((state) => state.token);
  
  // Teacher form state
  const [teacherData, setTeacherData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    subjects: "",
    class_id: "",
  });

  // Student form state
  const [studentData, setStudentData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    class_id: "",
  });

  // Load students and classes when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        // Use API functions instead of direct fetch calls
        const studentsData = await fetchStudents(token);
        setStudents(studentsData);
        
        const classesData = await fetchClasses(token);
        setClasses(classesData);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again.");
      }
    };
    
    loadData();
  }, [token]);

  // Handle teacher form submission
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      // Use API function instead of direct fetch
      const result = await createTeacher(teacherData, token);
      setMessage("Teacher created successfully!");
      // Reset form
      setTeacherData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        subjects: "",
        class_id: "",
      });
    } catch (error) {
      console.error("Error creating teacher:", error);
      setError(error.message || "Failed to create teacher. Please try again.");
    }
  };

  // Handle student form submission
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      // Use API function instead of direct fetch
      const result = await createStudent(studentData, token);
      setMessage("Student created successfully!");
      // Reset form
      setStudentData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        class_id: "",
      });
    } catch (error) {
      console.error("Error creating student:", error);
      setError(error.message || "Failed to create student. Please try again.");
    }
  };

  // ... rest of the component ...
};

export default AdminUserCreatePage;

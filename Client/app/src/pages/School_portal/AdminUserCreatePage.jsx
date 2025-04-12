import React, { useState, useEffect } from "react";
import useTokenStore from "../../stores/useTokenStore";

export default function AdminUserCreationPage() {
  const [users, setUsers] = useState([]);
  const [teacherAccount, setTeacherAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [studentAccount, setStudentAccount] = useState({
    username: "",
    email: "",
    password: "",
    student_class: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/students/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/classes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setTeacherAccount({ ...teacherAccount, [name]: value });
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentAccount({ ...studentAccount, [name]: value });
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = useTokenStore.getState().token;
      const response = await fetch("http://localhost:8000/api/create-teacher/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teacherAccount),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Teacher account created successfully");
        setTeacherAccount({ username: "", email: "", password: "" });
      } else {
        setError(data.error || "Failed to create teacher account");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = useTokenStore.getState().token;
      const response = await fetch("http://localhost:8000/api/create-student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studentAccount),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Student account created successfully");
        setStudentAccount({
          username: "",
          email: "",
          password: "",
          student_class: "",
        });
        fetchUsers(); // Refresh users list
      } else {
        setError(data.error || "Failed to create student account");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ...existing code...
}

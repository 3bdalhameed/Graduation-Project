import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar_logon/navbar";

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/profile/${username}/`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <p className="text-center text-white mt-20">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
        <Navbar />
      </div>
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Profile: {user.username}</h1>
        <p className="text-lg mb-2">Email: {user.email}</p>
        <p className="text-lg">Date Joined: {new Date(user.date_joined).toLocaleString()}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}

export default UserProfile;

import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/users";
import { Link } from "react-router-dom";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 text-gray-800 dark:text-white">
      <div className="pt-24 px-6 md:px-12">
        <h1 className="text-4xl font-extrabold text-center my-8 py-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-fade-in-up">
          🧑‍💻 Registered Users
        </h1>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-300 animate-pulse">
            Loading users...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 animate-fade-in-up">
            <table className="w-full table-auto text-left">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-wider text-sm font-semibold">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-300 ${
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-900"
                        : "bg-gray-200 dark:bg-gray-800"
                    } hover:bg-blue-100 dark:hover:bg-blue-900`}
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/profile/${user.username}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline underline-offset-4 transition-all duration-200"
                      >
                        {user.username}
                      </Link>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-6 text-gray-500 dark:text-gray-300">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersPage;

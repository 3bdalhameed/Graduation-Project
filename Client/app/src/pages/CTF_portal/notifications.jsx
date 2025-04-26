import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const navigate = useNavigate();

  // 🟢 Static Notifications Example
  const staticNotifications = [
    {
      id: 1,
      title: "JuCC Cyber Hub Is Live Now",
      message: "Go Test Your Skills In Hacking Now",
      timestamp: "2025-04-26T14:30:00Z",
      link: "/challenge",
    },
    {
      id: 2,
      title: "✅ Maintenance Completed",
      message: "The server maintenance was successfully completed. Thanks for your patience!",
      timestamp: "2025-04-24T09:15:00Z",
      link: "",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            🛎️ Notifications
          </h1>

          {staticNotifications.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No notifications at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {staticNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                  onClick={() => notif.link && navigate(notif.link)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {notif.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <p className="mt-2 text-blue-600 dark:text-blue-400 text-sm underline">
                      Click to view more →
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

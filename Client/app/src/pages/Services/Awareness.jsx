import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import Abd from "../img/1.png";
import Omar from "../img/7.png";

const AboutUs = () => {
  const mission = [
    {
      title: "🔍 JCCT (Jordan Cybersecurity Compliance Tool)",
      description: "JCCT helps local organizations align with the Jordanian National Cybersecurity Framework (JNCSF). It provides visibility into their compliance status, highlights areas needing improvement, and guides them in strengthening their cybersecurity posture."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 -z-10">
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            About Us
          </h1>

          <p className="text-lg md:text-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
            Yazeed and Shahed — two senior cybersecurity students passionate about making a real impact in the field. We're all about turning what we learn into practical solutions that actually solve problems. Our goal is to contribute to the growth of cybersecurity in Jordan by coming up with creative, effective ways to tackle the challenges organizations face every day.
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-semibold mb-8 text-blue-700 dark:text-blue-400 text-center">Our Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {mission.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-semibold mb-8 text-indigo-700 dark:text-indigo-400 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[{ name: "Yazeed", role: "Co-Founder", img: Abd }, { name: "Shahed", role: "Co-Founder", img: Omar }].map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-white shadow-sm"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

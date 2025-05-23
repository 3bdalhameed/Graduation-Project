import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import Farah from "../img/6.png";
import Lana from "../img/8.png";
import MethodologyGraph from "../img/methodology-graph.png"; // Make sure this file is in your public/img or src/img folder

const AboutUs = () => {
  const methodology = [
    {
      title: "📥 Pre-Assessment",
      description: "Evaluate current awareness levels to personalize training."
    },
    {
      title: "🎓 Training",
      description: "Interactive and relevant sessions focused on real-world threats."
    },
    {
      title: "📝 Post-Assessment",
      description: "Measure knowledge improvement and identify gaps."
    },
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

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
              About Us
            </h1>
            <p className="text-lg md:text-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
              We are the JUCC Assessment and Training Team. Our mission is to turn everyone at the University of Jordan into a strong first line of defense through hands-on assessments and fun, impactful trainings.
            </p>
          </div>

          <section className="mb-20">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">Our Methodology</h2>
              <div className="flex justify-center mb-10">
                <img
                  src={MethodologyGraph}
                  alt="Methodology Graph"
                  className="rounded-xl shadow-md w-full max-w-2xl"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {methodology.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-10">Meet the Team</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[{ name: "Farah Hammudeh", role: "Team Member", img: Farah }, { name: "Lana Barakat", role: "Team Member", img: Lana }].map((member, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition"
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-white shadow-md"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

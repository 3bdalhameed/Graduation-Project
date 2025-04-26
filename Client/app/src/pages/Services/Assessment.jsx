import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import Farah from "../img/6.png";
import Lana from "../img/8.png";

// White-style images
import WhiteCycleImage from "../img/hart.png";
import WhiteRolesImage from "../img/assess.png";



  const services = [
    {
      title: "🔵 Pre-Assessment",
      description: "Evaluate current cybersecurity awareness levels to personalize training needs."
    },
    {
      title: "🔵 Training",
      description: "Deliver an engaging and dynamic learning experience focused on strengthening cybersecurity behaviors."
    },
    {
      title: "🔵 Post-Assessment",
      description: "Measure progress, identify gaps, adjust future training."
    },
  ];

  const teamMembers = [
    { name: "Farah Hammudeh", role: "Team Member", img: Farah },
    { name: "Lana Barakat", role: "Team Member", img: Lana },
  ];
  const AboutUs = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden pt-24 pb-12">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 -z-10">
          <div className="absolute inset-0 bg-grid bg-[length:30px_30px] opacity-[0.03] dark:opacity-[0.02]" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* About Us */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
              About Us
            </h1>
            <div className="shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700 rounded-2xl">
              <p className="text-lg md:text-lg bg-white dark:bg-gray-900">
                We are the JUCC Assessment and Training Team — the heart of cybersecurity awareness and growth at the University of Jordan.
              </p>
              <p className="text-lg md:text-lg text-blue-400 dark:text-blue-100">
                Our mission is to guide every student, faculty member, and staff member toward smarter, safer digital habits that protect our university.
              </p>
              <div className="flex justify-center pt-4">
                <img
                  src={WhiteCycleImage}
                  alt="White Methodology Cycle"
                  className="rounded-xl shadow-md w-full max-w-xl"
                />
              </div>
            </div>
          </div>

          {/* Our Vision */}
          <section className="mb-20">
            <div className="bg-white dark:bg-gray-900">
              <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">Our Vision</h2>
              <p className="text-2xl md:text-2xl text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
                A safe University where cybersecurity is everyone's responsibility.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-20">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">Our Methodology</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <img
                  src={WhiteRolesImage}
                  alt="White Role Structure"
                  className="rounded-xl shadow-md w-full max-w-xl"
                />
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-10">Meet the Team</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
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

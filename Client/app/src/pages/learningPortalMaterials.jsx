import React from "react";

export default function LearningMaterials() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Cybersecurity & CTF Fundamentals</h1>
      
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is Cybersecurity?</h2>
        <p className="text-gray-700 mb-4">
          Cybersecurity refers to the practice of protecting systems, networks, and programs from digital attacks. 
          These cyber threats are aimed at accessing, changing, or destroying sensitive information, 
          extorting money from users, or disrupting normal business operations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Introduction to CTF (Capture The Flag)</h2>
        <p className="text-gray-700 mb-4">
          CTF competitions are cybersecurity challenges that involve solving various security-related problems 
          to find hidden "flags." These challenges often include cryptography, web security, reverse engineering, 
          and forensics.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">Types of CTF Challenges:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
          <li><strong>Web Exploitation:</strong> Analyzing and attacking web applications.</li>
          <li><strong>Forensics:</strong> Investigating digital traces left behind in files and network traffic.</li>
          <li><strong>Cryptography:</strong> Breaking encrypted messages to retrieve hidden information.</li>
          <li><strong>Reverse Engineering:</strong> Understanding compiled programs and extracting information.</li>
          <li><strong>Pwn (Binary Exploitation):</strong> Exploiting vulnerabilities in executable programs.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Essential Cybersecurity Concepts</h2>
        <p className="text-gray-700 mb-4">
          Understanding these core concepts is crucial in cybersecurity and CTF challenges:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Encryption:</strong> Protecting data by converting it into unreadable formats.</li>
          <li><strong>Hashing:</strong> Ensuring data integrity by generating fixed-length representations.</li>
          <li><strong>Network Security:</strong> Securing networks from attacks like MITM (Man-In-The-Middle).</li>
          <li><strong>SQL Injection:</strong> Exploiting vulnerabilities in database queries.</li>
          <li><strong>XSS (Cross-Site Scripting):</strong> Injecting malicious scripts into web pages.</li>
        </ul>
      </div>
    </div>
  );
}

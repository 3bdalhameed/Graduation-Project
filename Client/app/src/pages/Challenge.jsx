import React, { useState } from "react";
import "./Challenge.css";
import Navbar from '../components/Navbar/navbar';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    field1: "Default Value 1",
    field2: "Default Value 2",
    field3: "Default Value 3",
    field4: "Default Value 4",
    field5: "Default Value 5",
  });
  const [editableFields, setEditableFields] = useState({
    field1: false,
    field2: false,
    field3: false,
    field4: false,
    field5: false,
  });

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted with Data: " + JSON.stringify(formData, null, 2));
    setShowPopup(false);
  };

  return (
    <>
    <header>
      <Navbar />
    </header>
    <div className="App">
      {/* Card */}
      <div className="card" onClick={handleCardClick}>
        <div className="card-header">
          <span className="category">Forensics</span>
          <span className="difficulty">Easy</span>
        </div>
        <h2 className="title">Verify</h2>
        <div className="card-footer">
          <span className="solves">26,857 solves</span>
          <span className="rating">80% 👍</span>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Fill the Details</h3>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((field, index) => (
                <div key={index} className="form-field">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEditClick(field)}
                  >
                    Edit
                  </button>
                  <label>
                    {`Field ${index + 1}: `}
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled={!editableFields[field]}
                    />
                  </label>
                  
                </div>
              ))}
              <div className="popup-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClosePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;

import React from 'react';

function Content() {
  return (
    <div className="contentC">
      <div className="cardC">
        <h4>Forensics</h4>
        <p>Verify</p>
        <p>Easy</p>
        <p>32,070 solves</p>
        <p>83%</p>
      </div>
      <div className="cardC">
        <h4>Binary Exploitation</h4>
        <p>format string 0</p>
        <p>Easy</p>
        <p>18,396 solves</p>
        <p>91%</p>
      </div>
      {/* Add more cards as needed */}
      <div className="pagination">
        <button>&laquo;</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        {/* Add more pagination buttons as needed */}
        <button>&raquo;</button>
      </div>
    </div>
  );
}

export default Content;

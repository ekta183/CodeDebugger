import React, { useState } from "react";

const Home = () => {
  const [code, setCode] = useState("");  
  const [response, setResponse] = useState(""); 

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/analyse", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResponse(data.message); 
    } catch (error) {
      setResponse("Error connecting to the backend.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Paste Your Code Below:</h2>

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Paste your code here!"
        rows="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <div>
      <button 
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
      </div>

      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default Home;

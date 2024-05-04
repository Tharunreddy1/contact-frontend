import React, { useState } from "react";
import axios from "axios";

const Csvdata = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      setUploadMessage("Please select a CSV file to upload."); // Inform user about missing file
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadMessage(response.data.message || "File uploaded successfully!"); // Display success message from backend (if provided)
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Error uploading file. Please check the console for details."); // Inform user about upload error
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage(null); // Clear previous message on file change
  };

  return (
    <div className='flex justify-center items-center  m-10'>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button className="border-2 py-1 px-4 rounded bg-blue-500 text-white font-semibold" type="submit">
          Upload
        </button>
        {uploadMessage && <p className="text-green-500">{uploadMessage}</p>} {/* Display upload message if any */}
      </form>
    </div>
  );
};

export default Csvdata;

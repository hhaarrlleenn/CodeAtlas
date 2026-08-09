import { useState } from "react";
import Navbar from "../components/Navbar";

function Upload() {
  const [openApiFile, setOpenApiFile] = useState(null);
  const [sqlFile, setSqlFile] = useState(null);

  const handleUpload = async () => {
    if (!openApiFile || !sqlFile) {
      alert("Please select both OpenAPI and SQL files.");
      return;
    }

    const formData = new FormData();
    formData.append("openapi", openApiFile);
    formData.append("sql", sqlFile);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log("Graph received from backend:");
      console.log(data.graph);

      // Save graph in browser
      localStorage.setItem("graph", JSON.stringify(data.graph));

      // Go to diagram page
      window.location.href = "/diagram";
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Navbar */}
      <Navbar />

      {/* Heading */}
      <h1 className="text-white text-6xl font-bold text-center pt-24">
        Upload Your Files
      </h1>

      <p className="text-gray-400 text-2xl text-center mt-6">
        Upload your OpenAPI specification and SQL schema
        <br />
        to generate visual diagrams.
      </p>

      {/* Upload Card */}
      <div className="max-w-6xl mx-auto mt-20 bg-[#1E293B] border border-gray-700 rounded-3xl p-10">
        <div className="grid grid-cols-2 gap-10">

          {/* OpenAPI Upload */}
          <div className="border-2 border-dashed border-blue-500 rounded-2xl h-72 flex flex-col items-center justify-center">
            <input
              type="file"
              id="openapi-upload"
              accept=".yaml,.yml,.json"
              className="hidden"
              onChange={(e) => setOpenApiFile(e.target.files[0])}
            />

            <label
              htmlFor="openapi-upload"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Choose OpenAPI File
            </label>

            {openApiFile ? (
              <p className="text-green-400 mt-6 text-center px-4">
                Selected:
                <br />
                {openApiFile.name}
              </p>
            ) : (
              <p className="text-gray-400 mt-6 text-center">
                No OpenAPI file selected
              </p>
            )}
          </div>

          {/* SQL Upload */}
          <div className="border-2 border-dashed border-purple-500 rounded-2xl h-72 flex flex-col items-center justify-center">
            <input
              type="file"
              id="sql-upload"
              accept=".sql"
              className="hidden"
              onChange={(e) => setSqlFile(e.target.files[0])}
            />

            <label
              htmlFor="sql-upload"
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
            >
              Choose SQL File
            </label>

            {sqlFile ? (
              <p className="text-green-400 mt-6 text-center px-4">
                Selected:
                <br />
                {sqlFile.name}
              </p>
            ) : (
              <p className="text-gray-400 mt-6 text-center">
                No SQL file selected
              </p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold px-10 py-4 rounded-2xl transition"
          >
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
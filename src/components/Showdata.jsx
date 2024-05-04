import React, { useEffect, useState } from "react";
import axios from "axios";

const Showdata = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/data");
        setData(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 p-6 max-w-xl w-full">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data.</p>}
        {!loading && !error && (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Select</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                    <td className="border px-4 py-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    </td>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.mobile}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > itemsPerPage && (
              <nav className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
                    <li key={number}>
                      <button
                        className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} border border-blue-500`}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Showdata;

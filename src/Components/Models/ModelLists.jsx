// components/ModelList.js
import { useEffect, useState } from "react";
import { getAllModels } from "@/app/APIs/Models/Model"; // Ensure the correct path based on your file structure
import { IoGrid } from "react-icons/io5"; // Import grid icon from react-icons
import { MdViewList } from "react-icons/md"; // Import list view icon from react-icons
import { useRouter } from "next/router"; // Import Next.js router

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [view, setView] = useState("grid"); // Default to grid view
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getAllModels();
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []);

  const toggleView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  // Handle navigation to the model details page
  const handleNavigate = (id) => {
    router.push(`/model/${id}`); // Navigate to the model details page by ID
  };

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-start space-x-4">
        <button
          onClick={toggleView}
          className="mb--4 flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {view === "list" ? (
            <>
              <IoGrid className="h-5 w-5 mr-2" /> {/* Grid icon */}
              Grid View
            </>
          ) : (
            <>
              <MdViewList className="h-5 w-5 mr-2" /> {/* List view icon */}
              List View
            </>
          )}
        </button>
        <h2 className="text-lg text-center font-bold">Model Tests</h2>
      </div>
      <div
        className={`grid gap-4 ${
          view === "list"
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {models?.map((model) => (
          <div
            key={model._id}
            onClick={() => handleNavigate(model._id)} // Handle navigation on click
            className="p-4 bg-white border border-gray-200 rounded shadow-md cursor-pointer hover:bg-gray-100"
          >
            <h3 className="text-lg font-semibold">{model.name}</h3>
            <p className="text-gray-600">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelList;

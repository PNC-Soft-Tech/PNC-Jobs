// components/ContestList.js
import { getAllContests } from "@/app/APIs/Contests/Contest";
import { useEffect, useState } from "react";
import { ViewListIcon, Squares2X2Icon } from "@heroicons/react/24/outline"; // Correct import for Heroicons v2
import { IoGrid } from "react-icons/io5";
import { MdViewList } from "react-icons/md";

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [view, setView] = useState("grid"); // Default to grid view

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await getAllContests();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  const toggleView = () => {
    setView(view === "list" ? "grid" : "list");
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
            <IoGrid className="h-5 w-5 mr-2" />
            Grid View
          </>
        ) : (
          <>
            <MdViewList  className="h-5 w-5 mr-2" />
            List View
          </>
        )}
      </button>
      <h2 className="text-lg text-center font-bold">Contests</h2>
      </div>
      <div
        className={`grid gap-4 ${
          view === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {contests?.map((contest) => (
          <div
            key={contest._id}
            className="p-4 bg-white border border-gray-200 rounded shadow-md"
          >
            <h3 className="text-lg font-semibold">{contest.name}</h3>
            <p className="text-gray-600">{contest.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestList;

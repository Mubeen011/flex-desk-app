import React from "react";
import SearchBox from "../ui_components/SearchBox";
import { useState } from "react";
import PeopleCards from "./PeopleCards";
import TeamCards from "./TeamCards";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Peoples() {
  const [currentTab, setCurrentTab] = useState("people");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    // const fetchPlannerData = async () => {
    //   try {
    //     const response = await getPlannerdata(
    //       formatDate(currentWeek[0].date),
    //       formatDate(currentWeek[currentWeek.length - 1].date),
    //       e.target.value
    //     );
    //     setPlannerData(response.data);
    //     console.log(response.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // fetchPlannerData();
    // console.log(e.target.value);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex gap-2 my-3 mr-2">
          <button
            className={classNames(
              currentTab === "people"
                ? "text-white bg-black border-black "
                : "text-black bg-white border-gray-300 ",
              "text-sm text-gray-600  rounded-lg  border-2 px-3 py-2 "
            )}
            onClick={() => setCurrentTab("people")}
          >
            People
          </button>
          <button
            className={classNames(
              currentTab === "myteam"
                ? "text-white bg-black border-black "
                : "text-black bg-white border-gray-300 ",
              "text-sm whitespace-nowrap text-gray-600   rounded-lg  border-2 px-3 py-2 "
            )}
            onClick={() => setCurrentTab("myteam")}
          >
            My Team
          </button>
        </div>
        <div className="flex-grow w-full">
          <div className="mt-2">
            <div className="flex items-center w-full px-4 py-1 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search and filter here"
                className="flex-1 ml-2 text-sm bg-transparent border-none ring-0 outline-none placeholder-gray-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      {currentTab === "people" ? (
        <PeopleCards search={search} />
      ) : (
        <TeamCards search={search} />
      )}
    </div>
  );
}

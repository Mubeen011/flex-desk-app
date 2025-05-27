import React, { useContext, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";
import Layout1 from "../../assets/layouts/Layout1";
import avatar from "../../assets/avatars/Avatar1.svg";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import DropDown from "../ui_components/Dropdown";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/16/solid";
// import flatpickr from "flatpickr";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// import { getFilterData, postBookDesk } from "../../api/bookingAxios";
import DbaContext from "../../contexts/DbaProvider";
import Layout2 from "../../assets/layouts/Layout2";
import DialogBox from "../ui_components/DialogBox";
import { getFilterData, postBookDesk } from "../../api/dashboardAxios";
import {
  getDesks,
  getSearchData,
  getSearchResult,
} from "../../api/bookingAxios";

export default function FloorPlan() {
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const { startTime, setStartTime } = useContext(DbaContext);
  const { endTime, setEndTime } = useContext(DbaContext);
  const [selectedDates, setSelectedDates] = useState([]);

  const [selected, setSelected] = useState([]);
  const [location, setLocation] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [filterData, setFilterData] = useState({}); // Data from API
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [desks, setDesks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [occupants, setOccupants] = useState([]);

  // useEffect(() => {
  //   flatpickr(".time-picker", {
  //     enableTime: true,
  //     noCalendar: true,
  //     dateFormat: "H:i", // 24-hour format
  //     time_24hr: true,
  //   });
  // }, []);
  useEffect(() => {
    // Fetch filter data from the API
    const fetchFilterData = async () => {
      try {
        const response = await getFilterData();
        const data = await response.data;
        setFilterData(data); // Store the entire data object
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []);
  let [open, setopen] = useState(false);
  useEffect(() => {
    if (!hasUserSelected) {
      // Only run if the user hasn't explicitly selected the location
      const locationBuildings = filterData[location]
        ? Object.keys(filterData[location])
        : [];
      setBuildings(locationBuildings);
      setBuilding(""); // Reset building and floor when location changes
      setFloor("");
    }
  }, [location, filterData, hasUserSelected]); // Depend on hasUserSelected

  useEffect(() => {
    if (!hasUserSelected) {
      // Only run if the user hasn't explicitly selected the building
      if (location && building) {
        const buildingFloors =
          filterData[location] && filterData[location][building]
            ? filterData[location][building]
            : [];
        setFloors(buildingFloors);
        setFloor(""); // Reset floor when building changes
      } else {
        setFloors([]);
        setFloor("");
      }
    }
  }, [building, location, filterData, hasUserSelected]); // Depend on hasUserSelected

  const isAllSelected = location && building && floor;
  const isBookNowVisible = selected.length > 0;

  function handleBooking() {
    if (!location || !building || !floor || selected.length === 0) {
      alert("Please fill all fields and select at least one desk.");
      return;
    }

    const requestBody = {
      email: "moin.uddin@mivada.com",
      selectedDesks: selected, // Array of selected desk IDs
      startTime: startTime || "09:00:00", // Default to 9 AM if not selected
      endTime: endTime || "17:00:00", // Default to 5 PM if not selected
      selectedDates:
        selectedDates.length > 0
          ? selectedDates
          : [new Date().toISOString().split("T")[0]], // Default to today if no date selected
      locationName: location,
      buildingName: building,
      floorName: floor,
      firstName: "Moin",
      lastName: "Uddin",

      department: "Full-Stack",
    };
    console.log(requestBody);
    const bookDesk = async () => {
      try {
        const response = await postBookDesk(requestBody);
        console.log(response);
        const data = await response.data;
        // if (response.statusCode === "200") {
        //   setopen(true);
        // }
      } catch (error) {
        console.error("Error booking desk", error);
      }
    };

    bookDesk();
    // const apiUrl = `/flexdesk/getFilteredDesksInfo?locationId=1&buildingId=1&floorId=1&date=${selectedDates}&startTime=${startTime}&endTime=${endTime}`;

    // // Fetch the data from the API
    // const fetchDesksData = async () => {
    //   try {
    //     const response = await getDesks(apiUrl);
    //     const data = await response.data;
    //     setDesks(data);
    //     console.log(data); // Store desk data in state
    //   } catch (error) {
    //     console.error("Error fetching desk data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDesksData();
    setSelected([]);
  }
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Return in dd-mm-yyyy format
  };
  const [searchQuery, setSearchQuery] = useState(""); // For the search input
  const [suggestions, setSuggestions] = useState([]); // For the dropdown suggestions
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Toggle dropdown visibility

  // Debounced API call
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
      setIsDropdownVisible(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const url = `/flexdesk/searchUserBookings?searchText=${encodeURIComponent(
          searchQuery
        )}&date=${encodeURIComponent(selectedDates)}`;
        const response = await getSearchData(url);
        console.log(response.data);
        setSuggestions(response.data || []);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Debounce to prevent too many API calls
    // const timeoutId = setTimeout(() => {
    fetchSuggestions();
    // }, 300);

    // return () => clearTimeout(timeoutId); // Cleanup
  }, [searchQuery]);
  useEffect(() => {
    // Construct the API URL dynamically based on props
    const apiUrl = `/flexdesk/getFilteredDesksInfo?locationId=1&buildingId=1&floorId=1&date=${selectedDates}&startTime=${startTime}&endTime=${endTime}`;

    // Fetch the data from the API
    const fetchDesksData = async () => {
      try {
        const response = await getDesks(apiUrl);
        const data = await response.data;
        setDesks(data);
        console.log(data); // Store desk data in state
      } catch (error) {
        console.error("Error fetching desk data:", error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchDesksData, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [location, building, floor, selectedDates, startTime, endTime, selected]); // Re-fetch data if any parameter changes
  useEffect(() => {
    // Construct the API URL dynamically based on props
    const apiUrl = `/flexdesk/getFilteredDesksInfo?locationId=1&buildingId=1&floorId=1&date=${selectedDates}&startTime=${startTime}&endTime=${endTime}`;

    // Fetch the data from the API
    const fetchDesksData = async () => {
      try {
        const response = await getDesks(apiUrl);
        const data = await response.data;
        setDesks(data);
        console.log(data); // Store desk data in state
      } catch (error) {
        console.error("Error fetching desk data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesksData();
    const fetchOccupants = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/flexdesk/getInOfficeDetails?locationId=1&buildingId=1&floorId=1&date=${selectedDates}&startTime=${startTime}&endTime=${endTime}`
        );
        const data = await response.json();
        setOccupants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOccupants();

    // Clear interval on component unmount
  }, [location, building, floor, selectedDates, selected]); // Re-fetch data if any parameter changes
  const [highlightedDesk, setHighlightedDesk] = useState("");
  const handleSearchResultClick = async (userId, date) => {
    try {
      const response = await getSearchResult(
        `/flexdesk/searchResult?userId=${userId}&date=${date}`
      );
      const data = await response.data;

      if (data && data.length > 0) {
        const {
          locationName,
          buildingName,
          description,
          floorId,
          deskNumber,
          startTime,
          endTime,
        } = data[0];

        // Update filters
        setLocation(locationName);
        setBuilding(buildingName);
        setFloor(description);
        setStartTime(startTime);
        setEndTime(endTime);
        // setSelected([deskNumber]); // Highlight desk
        setHasUserSelected(true);
        // Pass deskNumber to Layout
        setHighlightedDesk(deskNumber);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  // const fetchOccupants = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/flexdesk/getInOfficeDetails?locationId=1&buildingId=1&floorId=1&date=${selectedDates}&startTime=${startTime}&endTime=${endTime}`
  //     );
  //     const data = await response.json();
  //     setOccupants(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchOccupants();
  // }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col h-full -mx-7 -mb-5 bg-white rounded-md border-l border-gray-300">
      <div className="relative flex items-center w-full justify-between px-4 py-1 border-b border-gray-300">
        <div className="flex items-center w-full px-4 py-1 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your co-worker"
            className="flex-1 ml-2 text-sm bg-transparent border-none ring-0 outline-none placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Dropdown for Suggestions */}
        {isDropdownVisible && suggestions.length > 0 && (
          <ul
            className="absolute left-3 w-full max-w-[1050px] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
            style={{ top: "100%" }} // Ensures dropdown always stays below the input
          >
            {suggestions.map((coworker, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                onClick={() => {
                  handleSearchResultClick(coworker.userId, selectedDates);
                  setIsDropdownVisible(false);
                  // Hide dropdown
                }}
              >
                {/* Name and Email */}
                <div>
                  <div className="font-semibold">
                    {coworker.firstName} {coworker.lastName}
                  </div>
                  <div className="text-xs text-gray-600">{coworker.email}</div>
                </div>

                {/* Department on the right */}
                <div className="text-sm text-gray-500">
                  {coworker.department}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 flex">
        <div className="flex-[3] p-2 border-r bg-gray-50 border-gray-300">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
            {/* Location Dropdown */}
            <DropDown
              label="Location"
              options={Object.keys(filterData)}
              selectedValue={location}
              onSelect={setLocation}
              // onClick={() => {
              //   // Reset selections when location dropdown is clicked
              //   setLocation("");
              //   setBuilding("");
              //   setFloor("");
              //   setHasUserSelected(false); // Reset the flag to allow useEffect to trigger
              // }}
            />

            {/* Building Dropdown */}
            <DropDown
              label="Building"
              options={buildings}
              selectedValue={building}
              onSelect={setBuilding}
              // disabled={!location} // Disable if no location is selected
            />

            {/* Floor Dropdown */}
            <DropDown
              label="Floor"
              options={floors}
              selectedValue={floor}
              onSelect={setFloor}
              // disabled={!building} // Disable if no building is selected
            />

            <div className="relative flex items-center">
              <CalendarIcon className="h-6 w-4 absolute left-2 top-1 transform transition-all duration-300 ease-in-out text-indigo-800 cursor-pointer" />
              <Flatpickr
                className="w-32 text-sm shadow-lg bg-white border-none h-8 rounded p-1 pl-8 pr-3 text-black hover:shadow-[12px_8px_8px_0px_rgba(0,0,0,0.4)] focus:ring-0 transition-all duration-300 ease-in-out"
                value={selectedDates[0] ? new Date(selectedDates[0]) : ""}
                onChange={(dates) => {
                  setSelectedDates([dates[0].toLocaleDateString("en-CA")]); // Store date as yyyy-mm-dd
                }}
                options={{
                  dateFormat: "d-m-Y", // Flatpickr format for yyyy-mm-dd
                  allowInput: true,
                }}
                placeholder="DD-MM-YYYY"
              />
            </div>

            <div className="flex items-center w-40 justify-center h-8 bg-white shadow-lg rounded text-sm border-none p-1 hover:-translate-y-0.5 capitalize text-black hover:shadow-[12px_8px_8px_0px_rgba(0,0,0,0.4)] focus:ring-0 transition-all duration-300 ease-in-out">
              <ClockIcon className="w-4 h-4 text-indigo-700 transform translate-x-[-8px]" />
              <Flatpickr
                className="time-picker w-12 h-6 text-sm bg-white border-none rounded p-1 text-center"
                value={startTime}
                onChange={(date) => {
                  const time = date[0].toTimeString().slice(0, 8); // Extract only HH:mm
                  setStartTime(time);
                }}
                options={{
                  time_24hr: true,
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                }}
                placeholder="From"
              />
              <span className="font-semibold">-</span>
              <Flatpickr
                className="time-picker w-12 h-6 text-sm bg-white border-none rounded p-1 text-center"
                value={endTime}
                onChange={(date) => {
                  const time = date[0].toTimeString().slice(0, 8); // Extract only HH:mm
                  setEndTime(time);
                }}
                options={{
                  time_24hr: true,
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                }}
                placeholder="To"
              />
            </div>
          </div>

          {isAllSelected ? (
            <div className="mb-2 text-md p-4 font-sans flex items-center space-x-2">
              <BuildingOffice2Icon className="w-6 h-6 text-indigo-700" />
              <span className="font-sans font-semibold">
                {location}, {building}, {floor}
              </span>
            </div>
          ) : (
            <h3 className="text-lg font-sans font-semibold ml-4 p-2">
              Floor Plan
            </h3>
          )}

          <div className="bg-gray-100 h-[500px] rounded-lg border border-gray-300 overflow-hidden">
            {location === "Hyderabad" &&
            building === "Block-1" &&
            floor === "Unit-1" ? (
              <div className="flex items-center justify-center h-full w-full overflow-auto">
                <div className="h-[600px] w-[600px] flex items-center justify-center">
                  {/* Ensures the Layout1 stays contained */}
                  <Layout1
                    selected={selected}
                    setSelected={setSelected}
                    desks={desks}
                    highlightedDesk={highlightedDesk}
                    setHighlightedDesk={setHighlightedDesk}
                    setHasUserSelected={setHasUserSelected}
                    setLocation={setLocation}
                    setBuilding={setBuilding}
                    setFloor={setFloor}
                  />
                </div>
              </div>
            ) : isAllSelected && floor === "Unit-2" ? (
              <div className="flex items-center justify-center h-full w-full overflow-auto">
                <div className="h-[600px] w-[600px] flex items-center justify-center">
                  {/* Ensures the Layout2 stays contained */}
                  <Layout2
                    selected={selected}
                    setSelected={setSelected}
                    desks={desks}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full text-gray-500">
                Please select all fields
              </div>
            )}
          </div>
        </div>

        <div className="flex-[1] w-1/3 p-4">
          <h3 className="text-lg font-semibold font-sans">In the Office</h3>
          <ul className="mt-2 space-y-2 font-sans">
            {occupants.map(({ firstName, lastName, deskNumber }) => (
              <li key={deskNumber} className="flex items-center space-x-2">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-9 h-12 rounded-full object-cover"
                />
                <span className="font-sans">
                  {firstName} {lastName}
                </span>
              </li>
            ))}
          </ul>
          {isBookNowVisible && (
            <button
              onClick={() => {
                {
                  setopen(true);
                }
              }}
              className="mt-60 ml-8 w-56 px-6 py-2 bg-blue-500 text-white rounded-md transform hover:-translate-y-3 shadow-black hover:shadow-[0px_12px_1px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen shadow-2xl items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border shadow-2xl bg-white p-6 rounded-md">
            <DialogTitle className="font-bold text-lg">
              Confirm Booking
            </DialogTitle>
            {/* Editable fields */}
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 text-center">
                    Location
                  </label>
                  <DropDown
                    label="Location"
                    options={Object.keys(filterData)}
                    selectedValue={location}
                    onSelect={setLocation}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 text-center">
                    Building
                  </label>
                  <DropDown
                    label="Building"
                    options={buildings}
                    selectedValue={building}
                    onSelect={setBuilding}
                    disabled={!location}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 text-center">
                    Floor
                  </label>
                  <DropDown
                    label="Floor"
                    options={floors}
                    selectedValue={floor}
                    onSelect={setFloor}
                    disabled={!building}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Date
                </label>
                <div className="flex items-center border border-gray-500 rounded-md justify-center">
                  <CalendarIcon className="w-6 h-6" />
                  <Flatpickr
                    className="w-full px-3 py-2 text-sm border-none rounded-md"
                    value={selectedDates[0] ? new Date(selectedDates[0]) : ""}
                    onChange={(dates) =>
                      setSelectedDates([dates[0].toLocaleDateString("en-CA")])
                    }
                    options={{
                      dateFormat: "d-m-Y",
                    }}
                    placeholder="Select a date"
                  />
                </div>
              </div>

              <div className="flex space-x-2 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-900">
                    Start Time
                  </label>
                  <Flatpickr
                    className="w-full px-3 py-2 text-sm border rounded-md"
                    value={startTime}
                    onChange={(date) => {
                      const time = date[0].toTimeString().slice(0, 8);
                      setStartTime(time);
                    }}
                    options={{
                      time_24hr: true,
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                    }}
                    placeholder="Start Time"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-900">
                    End Time
                  </label>
                  <Flatpickr
                    className="w-full px-3 py-2 text-sm border rounded-md"
                    value={endTime}
                    onChange={(date) => {
                      const time = date[0].toTimeString().slice(0, 8);
                      setEndTime(time);
                    }}
                    options={{
                      time_24hr: true,
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                    }}
                    placeholder="End Time"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900">
                  Selected Desks
                </label>
                <textarea
                  className="w-full px-3 py-1 text-sm border rounded-md"
                  value={selected.join(", ")}
                  onChange={(e) =>
                    setSelected(e.target.value.split(",").map((s) => s.trim()))
                  }
                  placeholder="Enter desk IDs separated by commas"
                />
              </div>
            </div>
            open
            {/* Confirm and Cancel Buttons */}
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => {
                  handleBooking();
                  setopen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md transform hover:-translate-y-3 shadow-black hover:shadow-[0px_12px_1px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Confirm
              </button>
              <button
                onClick={() => setopen(false)}
                className="bg-gray-300 text-gray-700  transform hover:-translate-y-3 shadow-black hover:shadow-[0px_12px_1px_0px_rgba(0,0,0,1)] transition-all duration-200 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

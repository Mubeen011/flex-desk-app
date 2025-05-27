import { setMultipleeSchedule } from "../../api/dashboardAxios";
import { useEffect, useState } from "react";
import { getFilterData } from "../../api/dashboardAxios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function MultipleSetSchedule({
  currentWeek,
  remount,
  open,
  setOpen,
  setRemount,
  setMine,
}) {
  const [location, setLocation] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [filterData, setFilterData] = useState({}); // Data from API
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    // Fetch filter data from the API
    const fetchFilterData = async () => {
      try {
        const response = await getFilterData(); // Replace with your API function
        const data = await response.data;
        setFilterData(data); // Store the entire data object
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []);

  useEffect(() => {
    // Update buildings when location changes
    if (location) {
      const locationBuildings = filterData[location]
        ? Object.keys(filterData[location])
        : [];
      setBuildings(locationBuildings);
      setBuilding(""); // Reset building and floor when location changes
      setFloor("");
    } else {
      setBuildings([]);
      setBuilding("");
      setFloor("");
    }
  }, [location, filterData]);

  useEffect(() => {
    // Update floors when building changes
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
  }, [building, location, filterData]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // setRemount((prev) => !prev);

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const finalObj = {
      email: "mubeen.mohammad@mivada.com",
      locationName: location,
      buildingName: building,
      floorName: floor,
      startDate: formDataObj.from.split(",")[0],
      endDate: formDataObj.to.split(",")[0],
      startTime: startTime,
      endTime: endTime,
    };
    console.log(finalObj);

    console.log("Form Data Object:", formDataObj);

    const postData = async () => {
      try {
        const response = await setMultipleeSchedule(finalObj);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    postData();
    setOpen(false);
    setMine((p) => p + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="location"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          Location
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">Select Location</option>
            {Object.keys(filterData).map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="building"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          Building
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="building"
            name="building"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            disabled={!location}
          >
            <option value="">Select Building</option>
            {buildings.map((bldg) => (
              <option key={bldg} value={bldg}>
                {bldg}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="floor"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          floor
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="floor"
            name="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            disabled={!building}
          >
            <option value="">Select Floor</option>
            {floors.map((flr) => (
              <option key={flr} value={flr}>
                {flr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="from"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          From
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="from"
            name="from"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            {currentWeek.map((com) => {
              return <option>{com.date + ", " + com.day}</option>;
            })}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="to"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          To
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="to"
            name="to"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            {currentWeek.map((com) => {
              return <option>{com.date + ", " + com.day}</option>;
            })}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="strtTime"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          Start Time
        </label>
        <div className="mt-2">
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
        </div>
      </div>

      <div>
        <label
          htmlFor="endTime"
          className="block text-xs font-medium text-gray-700 py-2"
        >
          End Time
        </label>
        <div className="mt-2">
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

      <div className="mt-5 sm:mt-6">
        <button
          type="submit"
          // onClick={() => setOpen(false)}
          className="inline-flex w-full justify-center rounded-md bg-[#AEEA94] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Set Schedule
        </button>
      </div>
    </form>
  );
}

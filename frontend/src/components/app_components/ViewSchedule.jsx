"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { editSchedule, getFilterData } from "../../api/dashboardAxios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function ViewSchedule({
  open,
  setOpen,
  date,
  locationView,
  buildingView,
  floorView,
  name,
  strtTimeView,
  endTimeView,
  edit,
  setEdit,
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalObj = {
      email: "mubeen.mohammad@mivada.com",
      locationName: location,
      buildingName: building,
      floorName: floor,
      date: date.split(",")[0],
      startTime: startTime,
      endTime: endTime,
    };
    console.log("Final Object to Submit:", finalObj);

    const postData = async () => {
      try {
        const response = await editSchedule(finalObj);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    };

    postData();
    setMine((p) => p + 1);
    setEdit(false); // Reset edit mode after submitting
  };
  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className=" ">
                  <div className="flex">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      View Schedule
                    </DialogTitle>
                    <div className="absolute right-0 top-2 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setEdit(false);
                          setMine((p) => p + 1);
                        }}
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="my-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-medium text-gray-900"
                        >
                          User
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            name="name"
                            readOnly
                            value={name}
                            className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-none placeholder:text-gray-400  sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Location
                        </label>
                        <div className="mt-2">
                          {edit ? (
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
                          ) : (
                            <input
                              id="location"
                              name="location"
                              readOnly
                              value={locationView}
                              className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 focus:outline-none outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="building"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Building
                        </label>
                        <div className="mt-2">
                          {edit ? (
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
                          ) : (
                            <input
                              id="building"
                              name="building"
                              readOnly
                              value={buildingView}
                              className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="floor"
                          className="block text-xs font-medium text-gray-900"
                        >
                          floor
                        </label>
                        <div className="mt-2">
                          {edit ? (
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
                          ) : (
                            <input
                              id="floor"
                              name="floor"
                              readOnly
                              value={floorView}
                              className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="date"
                          className="block text-xs font-medium text-gray-700 "
                        >
                          Date
                        </label>
                        <div className="mt-2">
                          <input
                            id="date"
                            name="date"
                            readOnly
                            value={date}
                            className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="strtTime"
                          className="block text-xs font-medium text-gray-700 "
                        >
                          Start Time
                        </label>
                        <div className="mt-2">
                          {edit ? (
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
                          ) : (
                            <input
                              id="strtTime"
                              name="strtTime"
                              readOnly
                              value={strtTimeView}
                              className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="endTime"
                          className="block text-xs font-medium text-gray-700 "
                        >
                          End Time
                        </label>
                        <div className="mt-2">
                          {edit ? (
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
                          ) : (
                            <input
                              id="endTime"
                              name="endTime"
                              readOnly
                              value={endTimeView}
                              className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {!edit && name === localStorage.getItem("name") && (
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="button"
                          onClick={() => setEdit(true)}
                          className="inline-flex w-full justify-center rounded-md bg-[#AEEA94] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Schedule
                        </button>
                      </div>
                    )}
                    {edit && (
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          onClick={() => setOpen(false)}
                          className="inline-flex w-full justify-center rounded-md bg-[#AEEA94] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save Schedule
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

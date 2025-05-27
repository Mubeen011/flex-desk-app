"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  editBooking,
  editSchedule,
  getFilterData,
} from "../../api/dashboardAxios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CalendarIcon } from "@heroicons/react/16/solid";
// import { ClockIcon } from "@heroicons/react/16/solid";
// import flatpickr from "flatpickr";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

export default function EditBooking({
  open,
  setOpen,
  location,
  building,
  floor,
  deskNumber,
  // setEdit,
  bookingId,
  setMine,
  mine,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = async () => {
      try {
        const response = await editBooking(
          bookingId,
          selectedDates[0],
          startTime,
          endTime
        );
        console.log(response);
        setMine((p) => p - 1);
      } catch (e) {
        console.error(e);
      }
    };

    postData();
    // setEdit(false); // Reset edit mode after submitting
  };
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
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
                      Edit Booking
                    </DialogTitle>
                    <div className="absolute right-0 top-2 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          //   setEdit(false);
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
                          htmlFor="deskNumber"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Desk Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="deskNumber"
                            name="deskNumber"
                            readOnly
                            value={deskNumber}
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
                          <input
                            id="location"
                            name="location"
                            readOnly
                            value={location}
                            className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 focus:outline-none outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                          />
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
                          <input
                            id="building"
                            name="building"
                            readOnly
                            value={building}
                            className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                          />
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
                          <input
                            id="floor"
                            name="floor"
                            readOnly
                            value={floor}
                            className="my-3 block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
                          />
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
                          <div className="relative flex items-center">
                            <CalendarIcon className="h-6 w-4 absolute left-2 top-1 transform transition-all duration-300 ease-in-out text-indigo-800 cursor-pointer" />
                            <Flatpickr
                              className="w-32 text-sm shadow-lg bg-white border-none h-8 rounded p-1 pl-8 pr-3 text-black hover:shadow-[12px_8px_8px_0px_rgba(0,0,0,0.4)] focus:ring-0 transition-all duration-300 ease-in-out"
                              value={
                                selectedDates[0]
                                  ? new Date(selectedDates[0])
                                  : ""
                              }
                              onChange={(dates) => {
                                setSelectedDates([
                                  dates[0].toLocaleDateString("en-CA"),
                                ]); // Store date as yyyy-mm-dd
                              }}
                              options={{
                                dateFormat: "d-m-Y", // Flatpickr format for yyyy-mm-dd
                                allowInput: true,
                              }}
                              placeholder="DD-MM-YYYY"
                            />
                          </div>
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
                          className="block text-xs font-medium text-gray-700 "
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
                    </div>

                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        onClick={() => {
                          setMine((p) => p + 1);
                          setOpen(false);
                        }}
                        className="inline-flex w-full justify-center rounded-md bg-[#AEEA94] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit
                      </button>
                    </div>
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

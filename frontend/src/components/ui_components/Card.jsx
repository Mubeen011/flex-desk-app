import { useState } from "react";
import Button from "./Button";
import EditBooking from "../app_components/EditBooking";
import { buildTransform } from "framer-motion";

export default function Card({
  deskNumber,
  location,
  building,
  floor,
  date,
  strtTime,
  endTime,
  bookingId,
  setMine,
  mine,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="mb-5 overflow-hidden rounded-lg bg-white shadow mr-3 hover:-translate-y-0.5
hover:shadow-[12px_8px_8px_0px_rgba(0,0,0,0.2)]
transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center p-5">
        {/* Desk Number */}
        <div className="text-lg font-bold rounded-full w-16 h-16 bg-green-300 flex items-center justify-center shadow-md">
          {deskNumber}
        </div>

        {/* Details Section */}
        <div className="ml-6">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Location:</span> {location}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Building:</span> {building}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Floor:</span> {floor}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">From</span> {strtTime}{" "}
            <span className="font-semibold">To</span> {endTime}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Date:</span> {date}
          </div>
        </div>
        <div className="px-4 pb-4 sm:p-6 flex justify-end">
          {/* <Button text={"Edit"} /> */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-x-2 rounded-md bg-[#AEEA94] px-3.5 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#97cc82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </div>
      </div>
      <EditBooking
        open={open}
        setOpen={setOpen}
        deskNumber={deskNumber}
        location={location}
        building={building}
        floor={floor}
        bookingId={bookingId}
        mine={mine}
        setMine={setMine}
      />

      {/* Edit Button */}
    </div>
  );
}

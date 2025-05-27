import { handleCancel } from "../api/listsAxios";
import deleteimg from "../assets/delete.svg";
import DeleteDailouge from "./DeleteDailouge";
import { useState } from "react";
export default function Lists({
  people,
  flag,
  clicked,
  setClicked,
  setStatus,
  currentTab,
}) {
  people = people.sort(
    (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)
  );

  const [open, setOpen] = useState(false);

  const formatDate = (inputDate) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const ordinalSuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}<sup>${ordinalSuffix(day)}</sup> ${month} ${year}`;
  };

  const handleClick = async (id) => {
    try {
      await handleCancel(id);
      setStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error("Cancelation failed:", error);
    }
  };

  console.log(people);
  var dataNow = people;
  if (currentTab === "Cancelled") {
    dataNow = people.filter((booking) => booking.status === true);
  } else if (currentTab === "Expired") {
    dataNow = people.filter((booking) => booking.status === false);
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {dataNow.map((person) => (
        <li
          key={person.bookingId}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium mb-3 text-gray-900">
                  Desk Number : {person.deskNumber - person.floorNumber * 100}
                </h3>
              </div>
              <span
                className={`shrink-0 items-center mb-2 rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                  flag
                    ? "bg-red-50 text-red-600 ring-red-600/20"
                    : "bg-green-50 text-green-700 ring-green-600/20"
                }`}
              >
                {" "}
                {person.locationName} - {person.buildingName} - Floor no{" "}
                {person.floorNumber}
              </span>
              <p className="mt-1 truncate text-sm text-gray-500">
                Booking date:{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatDate(person.bookingDate),
                  }}
                />
              </p>

              <p className="mt-1 truncate text-sm text-gray-500">
                Time: {person.startTime.slice(0, 5)} -{" "}
                {person.endTime.slice(0, 5)}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                {flag ? (
                  <p className=" relative font-bold -mr-px inline-flex w-0 flex-1 items-center justify-center text-xs/5 text-gray-500">
                    Status: {person.status ? "Cancelled" : "Expired"}{" "}
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      handleClick(person.bookingId);
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 group hover:text-red-500"
                  >
                    <img
                      src={deleteimg}
                      aria-hidden="true"
                      className="size-5 text-gray-400 transform transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:text-red-500"
                    />
                    <span className="transform transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:text-red-500">
                      Delete
                    </span>
                    {open && (
                      <DeleteDailouge
                        open={open}
                        setOpen={setOpen}
                        // handleLogout={handleLogout}
                        id={person.bookingId}
                        handleDelete={handleClick}
                        msg={"Are you sure you want to delete"}
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

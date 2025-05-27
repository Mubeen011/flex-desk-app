import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../ui_components/Button";
import { useEffect, useState } from "react";
import SetScheduleDailog from "./SetScheduleDailog";
import ViewSchedule from "./ViewSchedule";
import UserSpecificSchedule from "./UserSpecificSchedule";
import { getPlannerdata, setCheckIn } from "../../api/dashboardAxios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CheckIcon from "../ui_components/CheckIcon";

export default function PlannerTable({ mine, setMine }) {
  // const [remount, setRemount] = useState(true);
  function formatDate(dateString) {
    // Parse the date using the format provided
    const date = new Date(dateString);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
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

  function getStartOfWeek(date) {
    const day = date.getDay();
    const start = new Date(date);
    start.setDate(date.getDate() - day + (day === 0 ? -6 : 1)); // Adjust for Monday start
    return start;
  }

  function getWeekDates(startDate) {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const day = daysOfWeek[date.getDay()];
      const formattedDate = `${date.getDate()} ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}`;
      weekDates.push({ date: formattedDate, day });
    }
    return weekDates;
  }

  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );
  const [currentWeek, setCurrentWeek] = useState(
    getWeekDates(currentWeekStart)
  );
  console.log(currentWeek);

  const handlePrevWeek = () => {
    const prevWeekStart = new Date(currentWeekStart);
    prevWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeekStart);
    setCurrentWeek(getWeekDates(prevWeekStart));
  };

  const handleNextWeek = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeekStart);
    setCurrentWeek(getWeekDates(nextWeekStart));
  };
  const [open, setOpen] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [openView, setOpenView] = useState(false);
  const [selectedData, setSelectedData] = useState({
    person: null,
    date: null,
    location: null,
    building: null,
    floor: null,
    strtTime: null,
    endTime: null,
  });

  function handleOpenModal(
    person,
    date,
    location,
    building,
    floor,
    strtTime,
    endTime
  ) {
    console.log("dfsgfds" + strtTime);
    setSelectedData({
      person,
      date,
      location,
      building,
      floor,
      strtTime,
      endTime,
    });
    setOpenView(true); // Open the modal
  }

  const [specificData, setSpecificData] = useState({
    date: null,
    person: null,
  });
  const [openSpecific, setOpenSpecific] = useState(false);
  function handleOpenSpecific(name, date) {
    setSpecificData({ date, person: name });
    setOpenSpecific(true);
  }

  const [edit, setEdit] = useState(false);
  const [plannerData, setPlannerData] = useState([]);
  const handleCheckIn = () => {
    console.log("its cmng");
    const setCheckin = async () => {
      try {
        const response = await setCheckIn();
        setMine((p) => p + 1);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    setCheckin();
  };
  useEffect(() => {
    const fetchPlannerData = async () => {
      try {
        const response = await getPlannerdata(
          formatDate(currentWeek[0].date),
          formatDate(currentWeek[currentWeek.length - 1].date),
          ""
        );
        setPlannerData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlannerData();
  }, [currentWeek, open, openView, openSpecific, edit, mine]);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    const fetchPlannerData = async () => {
      try {
        const response = await getPlannerdata(
          formatDate(currentWeek[0].date),
          formatDate(currentWeek[currentWeek.length - 1].date),
          e.target.value
        );
        setPlannerData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlannerData();
    // console.log(e.target.value);
  };
  const getCurrentWeekDay = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return days[today.getDay()];
  };
  const today = getCurrentWeekDay();
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="flex mt-2">
          <button
            onClick={handlePrevWeek}
            className="w-6 h-6 hover:text-blue-500"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className=" font-semibold text-gray-900">
            {currentWeek[0].date.split(" ").slice(0, 2).join(" ") +
              "-" +
              currentWeek[currentWeek.length - 1].date
                .split(" ")
                .slice(0, 2)
                .join(" ")}
          </h1>
          <button
            onClick={handleNextWeek}
            className="w-6 h-6 hover:text-blue-500"
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="flex-grow mx-4">
          <div>
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
        <div className="mt-2  sm:flex-none">
          <Button setOpen={setOpen} text={"Set Schedule"} />
        </div>
        <SetScheduleDailog
          open={open}
          setOpen={setOpen}
          currentWeek={currentWeek}
          setMine={setMine}

          // remount={remount}
          // setRemount={setRemount}
        />
      </div>
      <ViewSchedule
        open={openView}
        setOpen={setOpenView}
        date={selectedData.date}
        name={selectedData.person}
        locationView={selectedData.location}
        buildingView={selectedData.building}
        floorView={selectedData.floor}
        strtTimeView={selectedData.strtTime}
        endTimeView={selectedData.endTime}
        edit={edit}
        setEdit={setEdit}
        setMine={setMine}
      />
      <UserSpecificSchedule
        open={openSpecific}
        setOpen={setOpenSpecific}
        date={specificData.date}
        name={specificData.person}
        setMine={setMine}
      />
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    {currentWeek.map((com) => (
                      <th
                        key={com.date}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {com.date.split(" ").slice(0, 2).join(" ") +
                          ", " +
                          com.day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {plannerData.map((person, indx) => (
                    <tr key={person.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="">
                          <div>
                            {indx === 0 &&
                              person.name === localStorage.getItem("name") &&
                              person[today.toLowerCase()] && (
                                <button
                                  className="w-4 h-4 -ml-6 mr-2 mt-[0.5]"
                                  onClick={handleCheckIn}
                                >
                                  <CheckIcon
                                    clicked={
                                      person[today.toLowerCase()]
                                        .isCheckedIn === "true"
                                    }
                                  />
                                </button>
                              )}
                            {person.name}
                          </div>
                          <p className="text-gray-400 text-xs">
                            {person.department}
                          </p>
                        </div>
                      </td>
                      {currentWeek.map((weekDay) => {
                        const dayKey = weekDay.day.toLowerCase();
                        const daySchedule = person[dayKey];
                        console.log(
                          daySchedule,
                          person.name,
                          person.isCheckedIn,
                          localStorage.getItem("name")
                        );
                        return (
                          <td
                            key={weekDay.date}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            <button
                              onClick={() => {
                                localStorage.getItem("name") === person.name
                                  ? daySchedule
                                    ? handleOpenModal(
                                        person.name,
                                        weekDay.date,
                                        daySchedule.location || "Set Schedule",

                                        daySchedule.building,
                                        daySchedule.floor,
                                        daySchedule.startTime,
                                        daySchedule.endTime
                                      )
                                    : handleOpenSpecific(
                                        person.name,
                                        weekDay.date
                                      )
                                  : daySchedule &&
                                    handleOpenModal(
                                      person.name,
                                      weekDay.date,
                                      daySchedule.location || "Set Schedule",

                                      daySchedule.building,
                                      daySchedule.floor,
                                      daySchedule.startTime,
                                      daySchedule.endTime
                                    );
                              }}
                              className={classNames(
                                "rounded-md px-2 py-1",
                                daySchedule
                                  ? daySchedule.isCheckedIn === "true"
                                    ? "border-green-400 border-2"
                                    : "border-gray-300 border-2"
                                  : "border-dashed border-2 border-gray-300"
                              )}
                            >
                              {daySchedule?.location ||
                                (!daySchedule &&
                                person.name === localStorage.getItem("name")
                                  ? "Set Schedule"
                                  : "Not Set Yet")}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

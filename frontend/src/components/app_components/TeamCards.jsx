import { useEffect, useState } from "react";
import { getMyTeam, getPeopledata } from "../../api/dashboardAxios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProfileModal from "./ProfileModal";
import SideFormPeople from "./SideFormPeople";

export default function TeamCards({ search }) {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await getMyTeam(search);
        setPeopleData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPeopleData();
  }, [search]);

  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({
    name: "",
    department: "",
    mail: "",
    bookings: [],
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {peopleData.map((ppl, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-2xl"
        >
          <div className="flex">
            <div className="pl-5 py-2">
              <svg
                width="90px"
                height="90px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                  fill="#1C274C"
                />
              </svg>
            </div>
            <div className="py-7 px-6">
              <p className="text-lg font-bold whitespace-nowrap">
                {ppl.firstName + " " + ppl.lastName}
              </p>
              <p className="text-sm text-gray-600">{ppl.department}</p>
            </div>
          </div>

          {/* Icon for hover */}
          <button
            onClick={() => {
              setOpen(true);
              console.log(ppl.bookingDetailsDTO);
              setParams((prev) => {
                return {
                  ...prev,
                  name: ppl.firstName + " " + ppl.lastName,
                  department: ppl.department,
                  mail: ppl.email,
                  bookings: ppl.bookingDetailsDTO,
                };
              });
            }}
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRightIcon
              style={{ width: "20px", height: "20px", color: "black" }}
            />
          </button>
          <div className="m-6">
            {/* <ProfileModal
              open={open}
              setOpen={setOpen}
              name={params.name} // Accessed correctly here
              department={params.department} // Accessed correctly here
              bookings={params.bookings} // Accessed correctly here
            /> */}
            <SideFormPeople
              open={open}
              setOpen={setOpen}
              name={params.name}
              department={params.department}
              bookings={params.bookings}
              mail={params.mail}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

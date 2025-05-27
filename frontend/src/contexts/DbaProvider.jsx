import React, { createContext, useState, useEffect } from "react";
// import { getRequest } from "../api/axios";
// import { fetchRole } from "../api/homeAxios";

const DbaContext = createContext();

export const DbaProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState("Hello, Context!");

  const [remountKey, setRemountKey] = useState(0);
  const [locations, setLocations] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(17);
  const [endMinute, setEndMinute] = useState(0);
  const [focusedField, setFocusedField] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startFocusedField, setStartFocusedField] = useState("start-hour");
  const [endFocusedField, setEndFocusedField] = useState("end-hour");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selection, setSelection] = useState({
    location: null,
    building: null,
    floor: null,
  });

  // const [nowrole, setnowrole] = useState();
  const [now, setNow] = useState("admin");
  // useEffect(() => {
  //   const fun = async () => {
  //     setNow(await fetchRole());
  //   };
  //   fun();
  // }, []);
  const [role, setRole] = useState(localStorage.getItem("userRole") || now);
  // useEffect(() => {
  //   const getdata = async () => {
  //     const fetchRole = async () => {
  //       try {
  //         const email = localStorage.getItem("email");
  //         const token = localStorage.getItem("access_token");
  //         const url = `/api/bookings/getRole?email=${encodeURIComponent(
  //           email
  //         )}`;
  //         const response = await getRequest(url, token);

  //         if (response?.data) {
  //           const role = response.data;
  //           localStorage.setItem("userRole", role);
  //           localStorage.setItem("userRoleExtra", role);
  //           // setUserRole(role); // Update state
  //           return role;
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch role:", error);
  //         return null;
  //       }
  //     };
  //     setnowrole(await fetchRole());
  //   };
  //   getdata();
  // }, []);
  const [userMail, setUserMail] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    localStorage.setItem("mail", "mubeen.mohammad@mivada.com");
    localStorage.setItem("name", "Mubeen Ahmed");
  }, []);
  useEffect(() => {
    const storedRole = localStorage.getItem("userRoleExtra");
    if (storedRole) {
      setRole(storedRole); // Only set context if not already set
    }
  }, []);

  const toggleRole = () => {
    const newRole = role === "admin" ? "user" : "admin";
    localStorage.setItem("userRoleExtra", newRole); // Store in localStorage
    setRole(newRole); // Update context state
    console.log("Role toggled to:", newRole); // Debugging log
  };

  return (
    <DbaContext.Provider
      value={{
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        role,
        setRole,
        sharedData,
        setSharedData,
        startFocusedField,
        setStartFocusedField,
        endFocusedField,
        setEndFocusedField,
        selectedDate,
        setSelectedDate,
        remountKey,
        setRemountKey,
        locations,
        setLocations,
        buildings,
        setBuildings,
        floors,
        setFloors,
        selection,
        setSelection,
        startHour,
        startMinute,
        endHour,
        endMinute,
        setEndHour,
        setEndMinute,
        setStartHour,
        setStartMinute,
        focusedField,
        setFocusedField,
        toggleRole,
      }}
    >
      {children}
    </DbaContext.Provider>
  );
};

export default DbaContext;

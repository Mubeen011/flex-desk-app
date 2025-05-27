import { useContext } from "react";
import DbaContext from "../contexts/DbaProvider";

function RoleToggle() {
  const { role, toggleRole } = useContext(DbaContext);
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  return (
    <>
      {isAdmin && (
        <div className="justify-center gap-4">
          <span className="text-sm text-gray-600">Current Role: {role}</span>
          <div className="flex items-center ml-8">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                checked={role === "admin"}
                onChange={toggleRole}
                className="sr-only peer ml-3"
              />
              <div className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer-checked:bg-red-400 transition duration-300"></div>
              <div className="w-5 h-5 bg-white rounded-full shadow absolute left-1 top-0.5 peer-checked:translate-x-5 transition-transform duration-300"></div>
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default RoleToggle;

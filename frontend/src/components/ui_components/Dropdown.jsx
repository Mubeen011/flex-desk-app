import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function DropDown({ label, options, selectedValue, onSelect }) {
  const [selectedKey, setSelectedKey] = useState(selectedValue);

  // Synchronize selectedKey with selectedValue whenever selectedValue changes
  useEffect(() => {
    setSelectedKey(selectedValue);
  }, [selectedValue]);

  const handleSelectionChange = (key) => {
    setSelectedKey(key);
    onSelect(key);
  };

  return (
    <div className="flex flex-col">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="shadow-lg hover:-translate-y-0.5 capitalize rounded-md bg-white text-black text-sm hover:shadow-[12px_8px_8px_0px_rgba(0,0,0,0.3)] focus:ring-0 transition-all duration-300 ease-in-out w-36 h-8 max-w-xs"
          >
            {selectedKey
              ? selectedKey.length > 10
                ? `${selectedKey.slice(0, 6)}...`
                : selectedKey
              : `${label}`}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={`Select ${label}`}
          onAction={handleSelectionChange}
          className="bg-white w-60 rounded-lg shadow-xl"
        >
          {options.map((option, index) => (
            <DropdownItem
              className="hover:bg-gray-200 cursor-pointer rounded-lg p-2"
              key={option}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

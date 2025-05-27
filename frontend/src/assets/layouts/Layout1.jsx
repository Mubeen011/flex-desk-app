import React, { useState } from "react";

export default function Layout1({
  selected,
  setSelected,
  desks,
  highlightedDesk,
  setHighlightedDesk,
  setHasUserSelected,
  setLocation,
  setBuilding,
  setFloor,
}) {
  // Path data stored in an array of objects with id, type, and path data
  const pathsData = [
    {
      id: "desk1",
      type: "main",
      d: "M168 103C168 98.5817 171.582 95 176 95H220C224.418 95 228 98.5817 228 103V147C228 151.418 224.418 155 220 155H176C171.582 155 168 151.418 168 147V103Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk8",
      type: "detail",
      d: "M185 155H211V161H185V155Z",
      fill: "#ABABAB",
    },
    {
      id: "desk9",
      type: "detail",
      d: "M185 89H211V95H185V89Z",
      fill: "#ABABAB",
    },
    {
      id: "desk10",
      type: "detail",
      d: "M234 112V138H228V112H234Z",
      fill: "#ABABAB",
    },
    {
      id: "desk11",
      type: "detail",
      d: "M168 112V138H162V112H168Z",
      fill: "#ABABAB",
    },
    {
      id: "desk2",
      type: "button",
      d: "M343.877 708.649C346.367 707.653 348 705.241 348 702.559V702.559C348 698.937 350.937 696 354.559 696H366H377.441C381.063 696 384 698.937 384 702.559V702.559C384 705.241 385.633 707.653 388.123 708.649L389 709C392.02 710.208 394 713.133 394 716.385V740C394 744.971 389.971 749 385 749H347C342.029 749 338 744.971 338 740V716.385C338 713.133 339.98 710.208 343 709L343.877 708.649Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk3",
      type: "button",
      d: "M161.877 708.649C164.367 707.653 166 705.241 166 702.559V702.559C166 698.937 168.937 696 172.559 696H184H195.441C199.063 696 202 698.937 202 702.559V702.559C202 705.241 203.633 707.653 206.123 708.649L207 709C210.02 710.208 212 713.133 212 716.385V740C212 744.971 207.971 749 203 749H165C160.029 749 156 744.971 156 740V716.385C156 713.133 157.98 710.208 161 709L161.877 708.649Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk4",
      type: "button",
      d: "M343.877 579.649C346.367 578.653 348 576.241 348 573.559V573.559C348 569.937 350.937 567 354.559 567H366H377.441C381.063 567 384 569.937 384 573.559V573.559C384 576.241 385.633 578.653 388.123 579.649L389 580C392.02 581.208 394 584.133 394 587.385V611C394 615.971 389.971 620 385 620H347C342.029 620 338 615.971 338 611V587.385C338 584.133 339.98 581.208 343 580L343.877 579.649Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk5",
      type: "button",
      d: "M161.877 579.649C164.367 578.653 166 576.241 166 573.559V573.559C166 569.937 168.937 567 172.559 567H184H195.441C199.063 567 202 569.937 202 573.559V573.559C202 576.241 203.633 578.653 206.123 579.649L207 580C210.02 581.208 212 584.133 212 587.385V611C212 615.971 207.971 620 203 620H165C160.029 620 156 615.971 156 611V587.385C156 584.133 157.98 581.208 161 580L161.877 579.649Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk6",
      type: "button",
      d: "M343.877 450.649C346.367 449.653 348 447.241 348 444.559V444.559C348 440.937 350.937 438 354.559 438H366H377.441C381.063 438 384 440.937 384 444.559V444.559C384 447.241 385.633 449.653 388.123 450.649L389 451C392.02 452.208 394 455.133 394 458.385V482C394 486.971 389.971 491 385 491H347C342.029 491 338 486.971 338 482V458.385C338 455.133 339.98 452.208 343 451L343.877 450.649Z",
      fill: "#D9D9D9",
    },
    {
      id: "desk7",
      type: "button",
      d: "M161.877 450.649C164.367 449.653 166 447.241 166 444.559V444.559C166 440.937 168.937 438 172.559 438H184H195.441C199.063 438 202 440.937 202 444.559V444.559C202 447.241 203.633 449.653 206.123 450.649L207 451C210.02 452.208 212 455.133 212 458.385V482C212 486.971 207.971 491 203 491H165C160.029 491 156 486.971 156 482V458.385C156 455.133 157.98 452.208 161 451L161.877 450.649Z",
      fill: "#D9D9D9",
    },
  ];

  // Function to handle path click event
  const handlePathClick = (id) => {
    const deskNumber = id.replace("desk", ""); // Extract desk number
    const desk = desks.find((d) => d.deskNumber === deskNumber);

    if (deskNumber === highlightedDesk) {
      // If the clicked desk is yellow, turn it red and reset highlightedDesk
      setHighlightedDesk(null);
      setHasUserSelected(false);
      setLocation("");
      setBuilding("");
      setFloor("");
    } else if (desk?.status === "unavailable") {
      // If the desk is red, make it yellow
      setHighlightedDesk(deskNumber);
    } else {
      // If the desk is default (#D9D9D9) or blue, ensure only one desk is selected
      setSelected(selected.includes(deskNumber) ? [] : [deskNumber]);
    }
  };

  const getDeskColor = (deskId) => {
    const deskNumber = deskId.replace("desk", ""); // Extract desk number
    if (deskNumber === highlightedDesk) {
      return "yellow"; // Yellow for highlightedDesk
    }

    const desk = desks.find((d) => d.deskNumber === deskNumber);
    if (!desk) return "#D9D9D9"; // Default color for untracked desks

    switch (desk.status) {
      case "unavailable":
        return "red"; // Red for unavailable desks
      default:
        return "#D9D9D9"; // Default gray
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="relative w-full h-full">
        <svg
          className="w-full h-full max-w-full max-h-full object-contain"
          width="100%" // Make the SVG scale based on the parent container width
          height="100%" // Make the SVG scale based on the parent container height
          viewBox="0 0 576 905" // Maintain aspect ratio
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(90deg)" }}
        >
          <rect
            x="2.5"
            y="2.5"
            width="571"
            height="900"
            rx="79.5"
            fill="white"
            stroke="black"
            strokeWidth="5"
          />
          <rect
            x="116.5"
            y="239.5"
            width="312"
            height="569"
            fill="white"
            stroke="black"
          />
          <rect
            x="71.5"
            y="43.5"
            width="252"
            height="156"
            fill="white"
            stroke="black"
          />
          {/* Iterate over path data and render paths dynamically */}
          {pathsData.map(({ id, type, d, fill }) => (
            <path
              key={id}
              id={id}
              type={type}
              d={d}
              fill={
                selected.includes(id.replace("desk", ""))
                  ? "blue"
                  : getDeskColor(id)
              } // Highlight selected desk, otherwise apply status color
              onClick={() => handlePathClick(id)} // Handle path click
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

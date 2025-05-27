import React, { useEffect, useState } from "react";
import Card from "../ui_components/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import PlannerTable from "./PlannerTable";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getActiveBookings } from "../../api/dashboardAxios";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// const cardsDetails = [
//   {
//     bookingId: 57,
//     locationName: "Hyderabad",
//     buildingName: "Block-1",
//     floorNumber: "Unit-1",
//     floorId: 1,
//     deskNumber: "7",
//     bookingDate: "2025-01-01",
//     startTime: "08:00:00",
//     endTime: "16:00:00",
//   },

//   {
//     bookingId: 57,
//     locationName: "Hyderabad",
//     buildingName: "Block-1",
//     floorNumber: "Unit-1",
//     floorId: 1,
//     deskNumber: "82",
//     bookingDate: "2025-01-01",
//     startTime: "08:00:00",
//     endTime: "16:00:00",
//   },

//   {
//     bookingId: 57,
//     locationName: "Hyderabad",
//     buildingName: "Block-1",
//     floorNumber: "Unit-1",
//     floorId: 1,
//     deskNumber: "72",
//     bookingDate: "2025-01-01",
//     startTime: "08:00:00",
//     endTime: "16:00:00",
//   },
// ];

export default function Dashboard() {
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -right-10 z-10 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900"
        onClick={onClick}
      >
        <ChevronRightIcon className="w-8 h-8" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -left-10 z-10 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900"
        onClick={onClick}
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </div>
    );
  }
  const settings = {
    dots: false, // You can enable dots if needed
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [cardsDetails, setCardDetails] = useState([]);
  const [mine, setMine] = useState(0);
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await getActiveBookings();
        setCardDetails(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBookingsData();
  }, [mine]);

  return (
    <div>
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold font-poppins tracking-wide text-lg mt-5">
          Recent Bookings
        </div>
      </div>

      {/* recent bookings cards */}
      {cardsDetails.length !== 0 ? (
        cardsDetails.length === 1 ? (
          cardsDetails.map((card, index) => (
            <Card
              key={index}
              location={card.locationName}
              building={card.buildingName}
              floor={card.floorNumber}
              strtTime={card.startTime}
              endTime={card.endTime}
              deskNumber={card.deskNumber}
              date={card.bookingDate}
              mine={mine}
              setMine={setMine}
            />
          ))
        ) : (
          <div className=" py-5 mx-5 transition-all duration-500">
            <Slider {...settings}>
              {cardsDetails.map((card, index) => (
                <Card
                  key={index}
                  location={card.locationName}
                  building={card.buildingName}
                  floor={card.floorNumber}
                  strtTime={card.startTime}
                  endTime={card.endTime}
                  deskNumber={card.deskNumber}
                  date={card.bookingDate}
                  bookingId={card.bookingId}
                  mine={mine}
                  setMine={setMine}
                />
              ))}
            </Slider>
          </div>
        )
      ) : (
        <div className="w-full h-[40%] p-8 rounded-lg border-2 text-black border-gray-400 border-dashed my-5 justify-center items-center flex">
          No bookings yet
        </div>
      )}

      {/* planner table  */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold font-poppins tracking-wide text-lg">
          Planner
        </div>
      </div>
      <div>
        <PlannerTable mine={mine} setMine={setMine} />
      </div>
    </div>
  );
}

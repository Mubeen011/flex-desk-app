package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.*;
import com.dba.poc.poc_dba2.entity.Booking;
import com.dba.poc.poc_dba2.entity.Desk;
import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.repository.BookingRepository;
import com.dba.poc.poc_dba2.repository.DeskRepository;
import com.dba.poc.poc_dba2.repository.FloorRepository;
import com.dba.poc.poc_dba2.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Slf4j
@Service
public class DeskService {

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    FloorRepository floorRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    UserRepository userRepository;

//    private boolean deskAvailability(DeskDetailsDTO desk, Date date, Time startTime, Time endTime){
//        if (desk.getDate() == null) {
//            //log.warn("Desk date is null for desk: " + desk.getDeskNumber());
//            return false; // Consider the desk unavailable or apply your business logic.
//        }
//        //log.info(date.toString());
//        return desk.getDate().toLocalDate().equals(date.toLocalDate()) && (desk.getStartTime().before(endTime) && desk.getEndTime().after(startTime));
//
//    }

    private String deskAvailabilityPartial(DesksDTO desk, Date date, Time startTime, Time endTime) {
        if (desk.getBookings().isEmpty()) {
            //log.warn("Desk date is null for desk: " + desk.getDeskNumber());
            //   log.info(desk.getBookings().toString());
            return "available";
        }
        //log.info(date.toString());
//         if(desk.getDate().toLocalDate().equals(date.toLocalDate()) && (desk.getStartTime().before(endTime) && desk.getEndTime().after(startTime))){
//             return "unavailable";
//         };
        for (BookingDTO bookingDTO : desk.getBookings()) {
            if (bookingDTO.getBookingDate().toLocalDate().equals(date.toLocalDate())) {
                //log.info(desk.getDate().toString());
                LocalTime deskStart = bookingDTO.getStartTime().toLocalTime();
                LocalTime deskEnd = bookingDTO.getEndTime().toLocalTime();

                if (deskStart.compareTo(startTime.toLocalTime()) <= 0 && deskEnd.compareTo(endTime.toLocalTime()) >= 0) {
                    return "unavailable";
                }

                if (deskStart.isBefore(endTime.toLocalTime()) && deskEnd.isAfter(startTime.toLocalTime())) {
                    return "partially_unavailable";
                }

            }
        }
        return "available";
    }

    public List<DesksDTO> getFilteredDesksService(int floorId, Date date, Time startTime, Time endTime) {
        List<DesksDTO> filteredDesks = deskRepository.findDesksByFilters(floorId, date);
        // log.info(filteredDesksByLocation.toString());
        for (DesksDTO desk : filteredDesks) {
            desk.setDeskNumber(Integer.toString(Integer.parseInt(desk.getDeskNumber()) + (floorId * 100)));
            int deskId = deskRepository.findByDeskNumber(desk.getDeskNumber()).getDeskId();
            List<BookingDTO> bookings = bookingRepository.findBookingsForDesk(deskId, date);
            desk.setBookings(bookings);
            // log.info(desk.toString());
            desk.setStatus(Desk.Status.valueOf(deskAvailabilityPartial(desk, date, startTime, endTime)));
            desk.setDeskNumber(Integer.toString(Integer.parseInt(desk.getDeskNumber()) - (floorId * 100)));
//            if(){
//                desk.setStatus(Desk.Status.unavailable);
//            }
//            else{
//                desk.setStatus(Desk.Status.available);
//            }
        }
        // log.info(filteredDesks.toString());
        return filteredDesks;
    }

    public Map<String, Map<String, List<String>>> getFilterData() {
        List<LocationFilterDetailsDTO> filterDetails = floorRepository.findLocationFilter();

        Map<String, Map<String, List<String>>> filterMap = new LinkedHashMap<>();
        for (LocationFilterDetailsDTO filterValue : filterDetails) {
            String locationName = filterValue.getLocationName();
            String buildingName = filterValue.getBuildingName();
            String floorName = filterValue.getFloorName();
            filterMap.putIfAbsent(locationName, new LinkedHashMap<>());

            Map<String, List<String>> buildings = filterMap.get(locationName);
            buildings.putIfAbsent(buildingName, new ArrayList<>());
            buildings.get(buildingName).add(floorName);
        }
        return filterMap;
    }

    public List<Integer> countByStatusService(List<DesksDTO> filteredDesks, Desk.Status status, String email) {
        int totalCount = 0;
        int userCount = 0;
        List<String> bookedUserEmails = new ArrayList<>();
        for (DesksDTO desk : filteredDesks) {
            if (desk.getStatus().equals(status))
                totalCount++;
            for(BookingDTO bookingDTO : desk.getBookings()){
                if (desk.getStatus().equals(status) && bookingDTO.getBookedByEmail() != null && bookingDTO.getBookedByEmail().equals(email))
                    userCount++;
            }
        }
        List<Integer> res = new ArrayList<>();
        res.add(totalCount - userCount);
        res.add(userCount);
        return res;
    }

    public Integer userBookedDesksCountService(String email, int locationId, int buildingId, int floorId, Date date, Time startTime, Time endTime) {
        return bookingRepository.getUserBookedCount(email, locationId, buildingId, floorId, date, startTime, endTime);
    }

    public List<InOfficeDetailsDTO> getInOfficeDetailsService(int floorId, Date date, Time startTime, Time endTime) {
        List<DesksDTO> deskDetailsDTOS = getFilteredDesksService(floorId, date, startTime, endTime);
        log.info(deskDetailsDTOS.toString());
        List<com.dba.poc.poc_dba2.dto.InOfficeDetailsDTO> inOfficeDetailsDTOS = new ArrayList<>();
        for (DesksDTO desk : deskDetailsDTOS) {
            if (desk.getStatus().toString().equals("unavailable") || desk.getStatus().toString().equals("partially_unavailable")) {
                // log.info(desk.getStatus().toString());
                for (BookingDTO booking : desk.getBookings()) {
                    String userAvatar = userRepository.findAvatarByEmail(booking.getBookedByEmail());
                    inOfficeDetailsDTOS.add(new com.dba.poc.poc_dba2.dto.InOfficeDetailsDTO(booking.getBookedByFirstName(), booking.getBookedByLastName(), desk.getDeskNumber(), userAvatar));
                }
            }
        }
        return inOfficeDetailsDTOS;
    }

    public Integer getFloorIdService(String locationName, String buildingName, String description) {
        return floorRepository.getFloorId(locationName, buildingName, description);
    }

    public List<DesksDTO> getMeetingRoomDetailsService(Date date, Integer floorId, Integer memberCount) {
        List<DesksDTO> filteredDesks = deskRepository.findDeskBookingsByFloorId(floorId);
        log.info(filteredDesks.toString());
        List<DesksDTO> invalidDesks = new ArrayList<>();
        // log.info(filteredDesksByLocation.toString());
        for (DesksDTO desk : filteredDesks) {
            desk.setDeskNumber(Integer.toString(Integer.parseInt(desk.getDeskNumber()) + (floorId * 100)));
            int deskId = deskRepository.findByDeskNumber(desk.getDeskNumber()).getDeskId();
            List<BookingDTO> bookings = bookingRepository.findBookingsForDesk(deskId, date);
            desk.setBookings(bookings);
            desk.setDeskNumber(Integer.toString(Integer.parseInt(desk.getDeskNumber()) - (floorId * 100)));
            // log.info(desk.toString());
            if (desk.getCapacity() < memberCount) {
                if (invalidDesks.contains(desk))
                    continue;
                else
                    invalidDesks.add(desk);
                log.info(String.valueOf(desk.getCapacity()));
            }
        }
        // log.info(invalidDesks.toString());
        filteredDesks.removeAll(invalidDesks);
        log.info(filteredDesks.toString());
        return filteredDesks;
//        return deskRepository.getMeetingRoomDetails(date, startTime, endTime, memberCount);
    }


    public static List<TimeSlotDTO> generate24HourTimeSlots() {
        return IntStream.range(0, 24)
                .mapToObj(hour -> new TimeSlotDTO(
                        new Time(hour, 0, 0),
                        new Time(hour + 1, 0, 0),
                        "available"
                ))
                .toList();
    }

    public List<TimeSlotDTO> deskTimeSlotsService(DesksDTO desk, Date sqlDate) {
        List<DesksDTO> desksInFloor = deskRepository.findDeskBookingsByFloorId(desk.getFloorId());

        for (DesksDTO desksDTO : desksInFloor) {
            if (desksDTO.getDeskNumber().equals(desk.getDeskNumber())) {
                desk = desksDTO;
                break;
            }
        }
        //   log.info("The desk is now: " + desk.toString());
        Desk deskInDB = deskRepository.findByDeskNumber(desk.getDeskNumber());
        //    log.info(deskInDB.toString());
        List<BookingDTO> bookings = bookingRepository.findBookingsForDesk(deskInDB.getDeskId(), sqlDate);
        //    log.info(bookings.toString());

        desk.setBookings(bookings);
        log.info(desk.toString());
        List<TimeSlotDTO> timeSlots = generate24HourTimeSlots();
        log.info(timeSlots.toString());
        for (TimeSlotDTO timeSlotDTO : timeSlots) {
            String statusCheck = deskAvailabilityPartial(desk, sqlDate, timeSlotDTO.getStartTime(), timeSlotDTO.getEndTime());
            // log.info(statusCheck);
            timeSlotDTO.setStatus(statusCheck);
        }
        return timeSlots;
    }
}

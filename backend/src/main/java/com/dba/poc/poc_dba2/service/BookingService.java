package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.BookDeskDTO;
import com.dba.poc.poc_dba2.dto.SearchResultDTO;
import com.dba.poc.poc_dba2.dto.SearchUserDTO;
import com.dba.poc.poc_dba2.entity.*;
import com.dba.poc.poc_dba2.repository.*;
import com.dba.poc.poc_dba2.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeskRepository deskRepository;

    @Autowired
    private FloorRepository floorRepository;

    @Autowired
    private BuildingRepository buildingRepository;

 	@Autowired
    private LocationRepository locationRepository;

    @Autowired
    private DashboardRepository dashboardRepository;
    public Booking bookDesk(BookDeskDTO bookDeskDTO){
        Booking booking = new Booking();
        User user = userRepository.findByEmail(bookDeskDTO.getEmail());
        booking.setUser(user);
     //   log.info(booking.getUser().toString());
        Desk desk = deskRepository.findByDeskNumber(bookDeskDTO.getSelectedDesks().get(0));
     //   log.info(desk.toString());
        if(desk.getCapacity() > 1)
            booking.setBookingType("Group");
        else
            booking.setBookingType("Desk");
        booking.setDesk(desk);
        desk.setOccupant(user);
    //    log.info(desk.getOccupant().toString());
        desk.setStatus(Desk.Status.unavailable);

        Floor floor = floorRepository.findByDescription(bookDeskDTO.getFloorName());
        booking.setFloor(floor);

        Building building = buildingRepository.findByBuildingName(bookDeskDTO.getBuildingName());
        booking.setBuilding(building);

        booking.setBookingDate(bookDeskDTO.getSelectedDates().get(0));
        booking.setStartTime(bookDeskDTO.getStartTime());
        booking.setEndTime(bookDeskDTO.getEndTime());
        booking.setStatus(true);
		WorkSchedule existingSchedule = dashboardRepository.findByUserAndWorkDate(user, booking.getBookingDate());

        if (existingSchedule == null) {
            WorkSchedule newSchedule = new WorkSchedule();
            newSchedule.setUser(user);
            newSchedule.setBuilding(building);
            newSchedule.setFloor(floor);
            newSchedule.setLocation(locationRepository.findByLocationName(bookDeskDTO.getLocationName()));
            newSchedule.setWorkDate(booking.getBookingDate());
            newSchedule.setStartTime(booking.getStartTime());
            newSchedule.setEndTime(booking.getEndTime());
            newSchedule.setIsCheckedIn(false);

            newSchedule = dashboardRepository.save(newSchedule);
            booking.setWorkSchedule(newSchedule);
        } else {
            booking.setWorkSchedule(existingSchedule);
        }
        return bookingRepository.save(booking);
    }

    public ResponseEntity<Response> bookDeskResponseService(BookDeskDTO bookDeskDTO) {
        Response response = new Response();

        User user = userRepository.findByEmail(bookDeskDTO.getEmail());
                if (user == null) {
            user = new User();
           user.setEmail(bookDeskDTO.getEmail());
          user.setFirstName(bookDeskDTO.getFirstName());
         user.setLastName(bookDeskDTO.getLastName());
         user.setDepartment(bookDeskDTO.getDepartment());
          userRepository.save(user);
      }
        List<Booking> existingBookings = bookingRepository.findByEmailAndDate(bookDeskDTO.getEmail(), bookDeskDTO.getSelectedDates().get(0));
        if (!existingBookings.isEmpty()) {
            response.setStatusCode("400");
            response.setStatusMsg("User already has a booking for the selected date. You can edit your bookings");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Floor floor = floorRepository.findByDescription(bookDeskDTO.getFloorName());
        if (floor == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Invalid floor name");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Location location=locationRepository.findByLocationName(bookDeskDTO.getLocationName());
        if (location == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Invalid location name");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Building building=buildingRepository.findByBuildingName(bookDeskDTO.getBuildingName());
        if (building == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Invalid building name");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        int floorId = floor.getFloorId();
        log.info(Integer.toString(floorId));

        List<String> mappedDeskNumbers = new ArrayList<>();
        for (String s : bookDeskDTO.getSelectedDesks()) {
            int mappedDesk = Integer.valueOf(s) + (floorId * 100);
            mappedDeskNumbers.add(Integer.toString(mappedDesk));
        }
        bookDeskDTO.setSelectedDesks(mappedDeskNumbers);
        log.info(mappedDeskNumbers.toString());

        if (bookDeskDTO.getSelectedDesks().isEmpty()) {
            response.setStatusCode("400");
            response.setStatusMsg("No desks selected");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        for (String deskNumber : bookDeskDTO.getSelectedDesks()) {
            List<Booking> bookedDesk = bookingRepository.findByDeskNumberWithDateAndTime(deskNumber, bookDeskDTO.getSelectedDates().get(0), bookDeskDTO.getStartTime(), bookDeskDTO.getEndTime());
		Desk desk = deskRepository.findByDeskNumber(bookDeskDTO.getSelectedDesks().getFirst());
            if (!bookedDesk.isEmpty() && desk.getCapacity() == 1) {
                response.setStatusCode("400");
                response.setStatusMsg("A booking already exists for desk number " + deskNumber + " at the selected date and time.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            
			}
        }

        Booking savedBooking = bookDesk(bookDeskDTO);
        if (savedBooking == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Booking failed :(");
            log.info("Booking failed for: {}", bookDeskDTO);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.setStatusCode("200");
        response.setStatusMsg("Booking done successfully!");
		List<String> originalDeskNumbers = new ArrayList<>();
        for (String s : bookDeskDTO.getSelectedDesks()) {
            int originalDesk = Integer.valueOf(s) - (floorId * 100);
            originalDeskNumbers.add(Integer.toString(originalDesk));
        }
        bookDeskDTO.setSelectedDesks(originalDeskNumbers);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public List<String> bookBulkDesksService(String email, List<BookDeskDTO> bulkDesks){
//        String loggedInUserRole = userRepository.findRoleByEmail(email).toString();
        Response response = new Response();
//        log.info(loggedInUserRole.toString());
//        if (!(loggedInUserRole.equals("admin"))) {
//            response.setStatusCode("400");
//            response.setStatusMsg("You don't have access to this operation");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }

        response.setStatusCode("400");
        response.setStatusMsg("Bulk booking failed");
        ResponseEntity<Response> responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        List<String> faultyBookings = new ArrayList<>();
        int count = 0;
        for (BookDeskDTO desk : bulkDesks) {
            count++;
            responseEntity = bookDeskResponseService(desk);
            log.info(String.valueOf(responseEntity.getStatusCode()));
            if(!(responseEntity.getBody().getStatusCode().equals("200"))){
                response = responseEntity.getBody();
                response.setStatusMsg(response.getStatusMsg() + " at the record: " + count);
//                faultyBookings.add(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response));
                faultyBookings.add(responseEntity.getBody().getStatusMsg());
//                break;
            }
        }
        log.info(faultyBookings.toString());
        return faultyBookings;
    }

    public List<ResponseEntity<Response>> bookInDateRange(BookDeskDTO bookInDateRangeDTO){
        List<ResponseEntity<Response>> responseEntities = new ArrayList<>();
        Response response = new Response();
        response.setStatusMsg("Booking failed, internal server error :(");
        response.setStatusCode("500");
        List<String> reqDesks = bookInDateRangeDTO.getSelectedDesks();
        List<Date> reqDates = bookInDateRangeDTO.getSelectedDates();
        for(Date date : reqDates){
            bookInDateRangeDTO.setSelectedDates(Collections.singletonList(date));
            ResponseEntity<Response> responseEntity = bookDeskResponseService(bookInDateRangeDTO);
            responseEntities.add(responseEntity);
            bookInDateRangeDTO.setSelectedDesks(reqDesks);
            log.info(responseEntities.get(responseEntities.size()-1).toString() + "for the date: " + date);
        }
        if(responseEntities.isEmpty())
        {
            responseEntities.add(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response));
        }
        return responseEntities;
    }

    public List<SearchUserDTO> searchUserBookings(String searchText, Date date){
        return bookingRepository.findUserBookings(searchText, date);
    }

    public List<SearchResultDTO> searchResult(int userId, Date date){
        return bookingRepository.searchResult(userId, date);
    }
}

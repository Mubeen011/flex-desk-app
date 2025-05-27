package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.*;
import com.dba.poc.poc_dba2.entity.*;
import com.dba.poc.poc_dba2.repository.*;
import com.dba.poc.poc_dba2.util.Response;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FloorRepository floorRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<WeeklyUserLocationDTO> getUsersWeeklyLocationsService(Date startDate, Date endDate, String loggedInUserEmail,String searchText) {

        List<Object[]> rawData = dashboardRepository.findUserWeeklyLocationsWithDetails(startDate, endDate, loggedInUserEmail);

        Map<String, WeeklyUserLocationDTO> userMap = new LinkedHashMap<>();

        Map<Integer, String> dayMapping = Map.of(
                1, "mon",
                2, "tue",
                3, "wed",
                4, "thu",
                5, "fri",
                6, "sat",
                7, "sun"
        );
//
//        for (User user : allUsers) {
//            WeeklyUserLocationDTO userDto = new WeeklyUserLocationDTO(user.getFirstName() + " " + user.getLastName());
//            userDto.setDepartment(user.getDepartment());
//            userMap.put(user.getEmail(), userDto);
//        }

        for (Object[] row : rawData) {
            String email = (String) row[8];
            String fullName = row[0] + " " + row[1];
            LocalDate workDate = row[2] != null ? ((Date) row[2]).toLocalDate() : null;
            String location = (String) row[3];
            String building = (String) row[4];
            String floor = (String) row[5];
//            String startTime = row[6] != null ? row[6].toString() : null;
//            String endTime = row[7] != null ? row[7].toString() : null;
            String isCheckedIn = row[9] != null ? row[9].toString() : null;
            String department=row[10].toString();
            String scheduleId=row[11]!=null? row[11].toString(): null;
            Long bookingsCount=(Long)row[12];
            WeeklyUserLocationDTO userDto = userMap.computeIfAbsent(email, key -> {
                WeeklyUserLocationDTO dto = new WeeklyUserLocationDTO(fullName);
                dto.setDepartment(department);
                return dto;
            });
            if (workDate != null) {
                String day = dayMapping.get(workDate.getDayOfWeek().getValue());
                DayDetailsDTO dayDetails = new DayDetailsDTO(location, building, floor,isCheckedIn,scheduleId,bookingsCount);
                switch (day) {
                    case "mon" -> userDto.setMon(dayDetails);
                    case "tue" -> userDto.setTue(dayDetails);
                    case "wed" -> userDto.setWed(dayDetails);
                    case "thu" -> userDto.setThu(dayDetails);
                    case "fri" -> userDto.setFri(dayDetails);
                    case "sat" -> userDto.setSat(dayDetails);
                    case "sun" -> userDto.setSun(dayDetails);
                }
            }
        }

        return new ArrayList<>(userMap.values());
    }


    public ResponseEntity<Response> bookScheduleResponseService(BookScheduleDTO bookScheduleDTO) {
        Response response = new Response();
        int rows=dashboardRepository.findByEmailWithDate(bookScheduleDTO.getEmail(),bookScheduleDTO.getDate());
        if(rows>0){
            response.setStatusCode("400");
            response.setStatusMsg("Schedule already exists on "+bookScheduleDTO.getDate());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        WorkSchedule workSchedule=new WorkSchedule();
        User user=userRepository.findByEmail(bookScheduleDTO.getEmail());
        workSchedule.setUser(user);
        workSchedule.setBuilding(buildingRepository.findByBuildingName(bookScheduleDTO.getBuildingName()));
        workSchedule.setFloor(floorRepository.findByDescription(bookScheduleDTO.getFloorName()));
        workSchedule.setLocation(locationRepository.findByLocationName(bookScheduleDTO.getLocationName()));
//        LocalDate parsedDate = LocalDate.parse(bookScheduleDTO.getDate());
//        workSchedule.setWorkDate(Date.valueOf(parsedDate));
            workSchedule.setWorkDate(bookScheduleDTO.getDate());
        workSchedule.setIsCheckedIn(false);
        dashboardRepository.save(workSchedule);
        response.setStatusCode("200");
        response.setStatusMsg("Schedule set successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    public ResponseEntity<Response> bookMultipleScheduleResponseService(BookMultipleScheduleDTO bookMultipleScheduleDTO) {
        Response response = new Response();
        response.setStatusCode("400");
        response.setStatusMsg("Bulk booking failed");
        ResponseEntity<Response> responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");
//        LocalDate startDate = LocalDate.parse(bookMultipleScheduleDTO.getStartDate(), formatter);
//        LocalDate endDate = LocalDate.parse(bookMultipleScheduleDTO.getEndDate(), formatter);
        LocalDate startDate= bookMultipleScheduleDTO.getStartDate().toLocalDate();
        LocalDate endDate= bookMultipleScheduleDTO.getEndDate().toLocalDate();
        List<LocalDate> datesInRange = startDate.datesUntil(endDate.plusDays(1)).toList();

        for (LocalDate date : datesInRange) {
            BookScheduleDTO bookScheduleDTO = new BookScheduleDTO();
            bookScheduleDTO.setEmail(bookMultipleScheduleDTO.getEmail());
            bookScheduleDTO.setLocationName(bookMultipleScheduleDTO.getLocationName());
            bookScheduleDTO.setBuildingName(bookMultipleScheduleDTO.getBuildingName());
            bookScheduleDTO.setFloorName(bookMultipleScheduleDTO.getFloorName());
            bookScheduleDTO.setDate(Date.valueOf(date.toString()));
//            bookScheduleDTO.setStartTime(bookMultipleScheduleDTO.getStartTime());
//            bookScheduleDTO.setEndTime(bookMultipleScheduleDTO.getEndTime());

            responseEntity=bookScheduleResponseService(bookScheduleDTO);
            if(!(responseEntity.getBody().getStatusCode().equals("200"))){
                response = responseEntity.getBody();
                response.setStatusMsg(response.getStatusMsg());
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                break;
            }
        }

        return responseEntity;
    }

    @Transactional
    public ResponseEntity<Response> editScheduleResponseService(BookScheduleDTO bookScheduleDTO) {
        List<Integer> bookings=dashboardRepository.findRespectiveBookings(bookScheduleDTO.getEmail(),bookScheduleDTO.getDate());
        for(Integer booking:bookings){
            cancelBooking(booking);
        }
        System.out.println(bookings);
        Response response=new Response();
        Building building=buildingRepository.findByBuildingName(bookScheduleDTO.getBuildingName());
        Location location=locationRepository.findByLocationName(bookScheduleDTO.getLocationName());
        Floor floor=floorRepository.findByDescription(bookScheduleDTO.getFloorName());
        Date workDate = bookScheduleDTO.getDate();
        dashboardRepository.editSchedule(bookScheduleDTO.getEmail(),building,location,floor,workDate);
        response.setStatusCode("200");
        response.setStatusMsg("Schedule edited successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Transactional
    public int getCheckIn(String email) {
        LocalDate localDate = LocalDate.now();
        int count= dashboardRepository.checkIn(email,localDate);
        if(count>0){
            return 1;
        }
        else{
            return 0;
        }
    }

    public List<ActiveBookingCardDTO> getActiveBookingDetails(String email,Date date) {
        return dashboardRepository.getActiveBookingDetails(email,date);
    }
    public ActiveBookingCard getEditBookingsInfo(int bookingId) {
       return dashboardRepository.getEditBookingsInfo(bookingId);
    }



    public List<ActiveBookingCardDTO> getPastBookingDetails(String email,Date startDate,Date endDate) {
        return dashboardRepository.getPastBookingDetails(email,startDate,endDate);
    }

    @Transactional
    public void editBooking(Integer bookingId, Date date, Time startTime, Time endTime) {
        dashboardRepository.editBooking(bookingId, date, startTime, endTime);
    }

    @Transactional
    public void cancelBooking(Integer bookingId) {
        Optional<Booking> booking =bookingRepository.findById(bookingId);
        WorkSchedule workSchedule=booking.get().getWorkSchedule();
        dashboardRepository.moveCanceledBookingsToHistory(bookingId);
        dashboardRepository.cancelBooking(bookingId);
        List<Booking> relatedBookings = bookingRepository.findByScheduleId(workSchedule.getScheduleId());
        if (relatedBookings.isEmpty()) {
            dashboardRepository.deleteById(workSchedule.getScheduleId());
        }
    }

    @Transactional
    public void cancelSchedule(Integer scheduleId) {
        List<Integer> bookings=dashboardRepository.findtoBeCancelledBookings(scheduleId);
        for(Integer booking:bookings){
            cancelBooking(booking);
        }
        dashboardRepository.cancelSchedule(scheduleId);
    }
    @Transactional
    public void checkExpiredBookings(){
//        Time now= Time.valueOf(LocalTime.now());
//        Date date= Date.valueOf(LocalDate.now());
        String currentTimestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        int insertedRows=dashboardRepository.movePastBookingsToHistory(currentTimestamp);
        int deletedRows=dashboardRepository.deletePastBookings(currentTimestamp);
        System.out.println(insertedRows+" "+ deletedRows);
    }



}

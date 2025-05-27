package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.BookingDetailsDTO;
import com.dba.poc.poc_dba2.dto.PeopleInfoDTO;
import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.repository.PeopleRepository;
import com.dba.poc.poc_dba2.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
public class PeopleService {

    @Autowired
    PeopleRepository peopleRepository;
    @Autowired
    UserRepository userRepository;
//    public List<PeopleInfoDTO> getPeopleInfoService(String searchText, String loggedInEmail, boolean isTeamView) {
//        List<Object[]> rawData;
//        Date startDate = Date.valueOf(LocalDate.now().minusDays(7));
//        Date endDate = Date.valueOf(LocalDate.now());
//
//        if (isTeamView) {
//            User user = userRepository.findByEmail(loggedInEmail);
//            // rawData = peopleRepository.findDeptPeopleInfo(searchText, loggedInEmail, user.getDepartment(), startDate, endDate);
//        } else {
//        }
//        rawData = peopleRepository.findPeopleInfo(searchText, loggedInEmail, startDate, endDate);
//
//        Map<String, PeopleInfoDTO> peopleMap = new LinkedHashMap<>();
//
//        // Map the weekday names for easy access
//        Map<Integer, String> dayMapping = Map.of(
//                1, "mon",
//                2, "tue",
//                3, "wed",
//                4, "thu",
//                5, "fri",
//                6, "sat",
//                7, "sun"
//        );
//
//        for (Object[] row : rawData) {
//            String firstName = (String) row[0];
//            String lastName = (String) row[1];
//            String department = (String) row[2];
//            String email = (String) row[3];
//            String locationName = (String) row[4];
//            LocalDate workDate = row[5] != null ? ((Date) row[5]).toLocalDate() : null;
//
//            PeopleInfoDTO peopleInfo = peopleMap.computeIfAbsent(email,
//                    key -> new PeopleInfoDTO(firstName, lastName, department, email, new LinkedHashMap<>()));
//
//            if (workDate != null) {
//                int dayOfWeek = workDate.getDayOfWeek().getValue();
//                String day = dayMapping.get(dayOfWeek);
//                peopleInfo.getBookingDetailsDTO().put(day, locationName);
//            }
//        }
//
//        // Fill any missing weekdays with null for each user
//        for (PeopleInfoDTO peopleInfo : peopleMap.values()) {
//            for (String day : dayMapping.values()) {
//                peopleInfo.getBookingDetailsDTO().putIfAbsent(day, null);
//            }
//        }
//
//        return new ArrayList<>(peopleMap.values());
//    }
public Map<String, String> getUserWeeklyLocations(Integer userId) {
    LocalDate today = LocalDate.now();

    LocalDate startDate = today.with(DayOfWeek.MONDAY);
    LocalDate endDate = today.with(DayOfWeek.SUNDAY);

    List<Object[]> rawData = peopleRepository.findUserWeeklyLocations(userId, Date.valueOf(startDate), Date.valueOf(endDate));

    // Initialize map for days of the week0
   Map<String, String> weeklyLocations = new LinkedHashMap<>();
    weeklyLocations.put("mon", null);
    weeklyLocations.put("tue", null);
    weeklyLocations.put("wed", null);
    weeklyLocations.put("thu", null);
    weeklyLocations.put("fri", null);
    weeklyLocations.put("sat", null);
    weeklyLocations.put("sun", null);

    Map<Integer, String> dayMapping = Map.of(
            1, "mon",
            2, "tue",
            3, "wed",
            4, "thu",
            5, "fri",
            6, "sat",
            7, "sun"
    );

    for (Object[] row : rawData) {
        LocalDate workDate = ((Date) row[0]).toLocalDate();
        String locationName = (String) row[1];

        String dayKey = dayMapping.get(workDate.getDayOfWeek().getValue());
        log.info(dayKey);
        weeklyLocations.put(dayKey, locationName);
    }

    return weeklyLocations;
}


    public List<PeopleInfoDTO> getPeopleListService(String searchText,String email,Boolean isTeamView) {
         if(isTeamView){
             User user=userRepository.findByEmail(email);
             return peopleRepository.getDeptPeopleList(searchText,email,user.getDepartment());
         }
         else{
             return peopleRepository.getPeopleList(searchText,email);
         }
    }
}

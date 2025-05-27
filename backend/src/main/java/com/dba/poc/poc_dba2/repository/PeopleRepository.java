package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.PeopleInfoDTO;
import com.dba.poc.poc_dba2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PeopleRepository extends JpaRepository<User,Integer> {


//    @Query("SELECT u.firstName,u.lastName,u.department,u.email,l.locationName,b.workDate FROM User u LEFT JOIN WorkSchedule b ON b.user.userId = u.userId LEFT JOIN Location l ON b.location.locationId = l.locationId WHERE (b.workDate>=:startDate AND b.workDate<=:endDate) AND LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchText, '%')) AND u.email!=:email ORDER BY b.workDate DESC")
//    List<Object[]> findPeopleInfo(String searchText, String email, Date startDate,Date endDate);


//    @Query("SELECT u.firstName,u.lastName,u.department,u.email,d.deskNumber,l.locationName,bu.buildingName,f.description,b.bookingDate,b.startTime,b.endTime FROM User u LEFT JOIN Booking b ON b.user.userId = u.userId LEFT JOIN Desk d ON b.desk.deskId = d.deskId LEFT JOIN Floor f ON d.floor.floorId = f.floorId LEFT JOIN Building bu ON f.building.buildingId = bu.buildingId LEFT JOIN Location l ON bu.location.locationId = l.locationId WHERE u.department= :department AND (b.bookingDate>=:startDate AND b.bookingDate<=:endDate) AND u.email!=:email AND LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchText, '%')) ORDER BY b.bookingDate DESC")
//    List<Object[]> findDeptPeopleInfo(String searchText, String email,String department,Date startDate,Date endDate);

    @Query("SELECT ws.workDate, l.locationName FROM WorkSchedule ws JOIN Location l ON ws.location.locationId = l.locationId WHERE ws.user.userId = :userId AND ws.workDate BETWEEN :startDate AND :endDate ORDER BY ws.workDate ASC")
    List<Object[]> findUserWeeklyLocations(@Param("userId") Integer userId,
                                           @Param("startDate") Date startDate,
                                           @Param("endDate") Date endDate);


    @Query("SELECT  new com.dba.poc.poc_dba2.dto.PeopleInfoDTO(u.firstName,u.lastName,u.department,u.email,u.userId) FROM User u WHERE LOWER(CONCAT(u.firstName,' ',u.lastName)) LIKE LOWER(CONCAT('%', :searchText, '%')) AND u.email!=:email")
    List<PeopleInfoDTO> getPeopleList(String searchText,String email);


    @Query("SELECT new com.dba.poc.poc_dba2.dto.PeopleInfoDTO(u.firstName,u.lastName,u.department,u.email,u.userId) FROM User u WHERE LOWER(CONCAT(u.firstName,' ',u.lastName)) LIKE LOWER(CONCAT('%', :searchText, '%')) AND u.email!=:email AND u.department=:department")
    List<PeopleInfoDTO> getDeptPeopleList(String searchText, String email,String department);
}

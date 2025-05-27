package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.*;
import com.dba.poc.poc_dba2.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT COUNT(b) FROM Booking b JOIN User u ON b.user.userId = u.userId JOIN Floor f ON b.floor.floorId = f.floorId JOIN Building bd ON f.building.buildingId = bd.buildingId JOIN Location l ON bd.location.locationId = l.locationId WHERE u.email = :email AND l.locationId = :locationId AND bd.buildingId = :buildingId AND f.floorId = :floorId AND b.bookingDate = :date AND b.startTime <= :endTime AND b.endTime >= :startTime")
    Integer getUserBookedCount(String email, int locationId, int buildingId, int floorId, Date date, Time startTime, Time endTime);

    @Query("SELECT b FROM Booking b WHERE b.user.email = :email AND b.bookingDate = :selectedDate")
    List<Booking> findByEmailAndDate(String email, Date selectedDate);

    @Query("SELECT b FROM Booking b WHERE b.desk.deskNumber = :deskNumber AND b.bookingDate = :selectedDate AND (b.startTime < :endTime AND b.endTime > :startTime)")
    List<Booking> findByDeskNumberWithDateAndTime(String deskNumber, Date selectedDate, Time startTime, Time endTime);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.SearchUserDTO(u.userId, u.firstName, u.lastName, u.email, u.department) FROM User u JOIN Booking b ON b.user.userId = u.userId WHERE b.bookingDate = :date AND " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<SearchUserDTO> findUserBookings(String searchText, Date date);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.SearchResultDTO(u.firstName, u.lastName, d.deskNumber, l.locationName, bu.buildingName, f.description, f.floorId, b.bookingDate, b.startTime, b.endTime) FROM Booking b JOIN User u ON b.user.userId = u.userId JOIN Desk d ON b.desk.deskId = d.deskId JOIN Floor f ON d.floor.floorId = f.floorId JOIN Building bu ON f.building.buildingId = bu.buildingId JOIN Location l ON bu.location.locationId = l.locationId WHERE u.userId = :userId AND b.bookingDate = :date")
    List<SearchResultDTO> searchResult(int userId, Date date);
	
	@Query("SELECT b from Booking b WHERE b.workSchedule.scheduleId = :scheduleId")
    List<Booking> findByScheduleId(Integer scheduleId);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.BookingDTO(b.bookingId, u.email, u.firstName, u.lastName, b.bookingDate, b.startTime, b.endTime) FROM Booking b LEFT JOIN User u ON b.user.userId = u.userId WHERE b.desk.deskId = :deskId AND b.bookingDate = :date")
    List<BookingDTO> findBookingsForDesk(@Param("deskId") Integer deskId, @Param("date") Date date);

    @Query("SELECT bl.buildingName, MONTH(b.bookingDate) AS bookingMonth, COUNT(*) FROM BookingHistory b JOIN building bl ON bl.buildingId = b.building.buildingId GROUP BY bl.buildingName, MONTH(b.bookingDate) ORDER BY bl.buildingName, bookingMonth")
    List<Object[]> getBookingsPerMonthPerBuilding();

    @Query("SELECT COUNT(*) FROM BookingHistory b")
    int getBookingCount();

    @Query("SELECT COUNT(*) FROM BookingHistory b WHERE b.status=true")
    int getCancelledCount();

    @Query("SELECT DAYOFWEEK(b.bookingDate) AS dayOfWeek, HOUR(b.startTime) AS bookingHour, COUNT(*),(SELECT COUNT(*) FROM Desk) FROM Booking b GROUP BY dayOfWeek, bookingHour ORDER BY dayOfWeek")
    List<Object[]> getHourlyWeekData();

    @Query("SELECT COUNT(*) FROM Desk")
    int getTotalCount();

    @Query("SELECT new com.dba.poc.poc_dba2.dto.TopBuildingsDTO(bl.buildingName,COUNT(b)) FROM BookingHistory b JOIN Building bl ON b.building.buildingId=bl.buildingId ORDER BY COUNT(b)")
    List<TopBuildingsDTO> getTopBuildings();
}

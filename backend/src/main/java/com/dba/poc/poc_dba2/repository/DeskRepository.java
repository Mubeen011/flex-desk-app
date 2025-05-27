package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.DeskBookingDetailsDTO;
import com.dba.poc.poc_dba2.dto.DeskDetailsDTO;
import com.dba.poc.poc_dba2.dto.DesksDTO;
import com.dba.poc.poc_dba2.entity.Desk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface DeskRepository extends JpaRepository<Desk, Integer> {

    @Query("SELECT new com.dba.poc.poc_dba2.dto.DesksDTO(d.deskNumber, d.floor.floorId, d.status, d.capacity, d.deskType) FROM Desk d JOIN Floor f ON d.floor.floorId = f.floorId JOIN " + "Building bl ON f.building.buildingId = bl.buildingId JOIN Location l ON bl.location.locationId = l" + ".locationId LEFT JOIN Booking b ON b.desk.deskId = d.deskId AND b.bookingDate = :date LEFT JOIN User u ON b.user.userId = u.userId" + " WHERE f.floorId = :floorId ")
    List<DesksDTO> findDesksByFilters(@Param("floorId") int floorId,
                                            @Param("date") Date date);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.DeskDetailsDTO(d.deskNumber, d.floor.floorId, d.status, d.capacity, d.deskType) FROM Desk d JOIN Floor f ON d.floor.floorId = f.floorId WHERE f.floorId = :floorId ")
    List<DeskDetailsDTO> findDesksByFloorId(@Param("floorId") int floorId);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.DesksDTO(d.deskNumber, d.floor.floorId, d.status, d.capacity, d.deskType) FROM Desk d JOIN Floor f ON d.floor.floorId = f.floorId WHERE f.floorId = :floorId ")
    List<DesksDTO> findDeskBookingsByFloorId(@Param("floorId") int floorId);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.DeskBookingDetailsDTO(d.deskId, d.deskNumber, u.firstName, u.lastName) " +
            "FROM Booking b JOIN b.desk d JOIN b.user u " +
            "WHERE b.status = true")
    List<DeskBookingDetailsDTO> findDeskBookingDetails();

//    @Query("SELECT new com.dba.poc.poc_dba2.dto.DeskDetailsDTO(d.deskNumber, d.status, d.capacity, d.desk_type, b.bookingId, u.email, u.firstName, u.lastName, b.bookingDate, b.startTime, b.endTime) FROM Desk d JOIN Floor f ON d.floor.floorId = f.floorId JOIN " + "Building bl ON f.building.buildingId = bl.buildingId JOIN Location l ON bl.location.locationId = l" + ".locationId LEFT JOIN Booking b ON b.desk.deskId = d.deskId AND b.bookingDate = :date LEFT JOIN User u ON b.user.userId = u.userId" + " WHERE l.locationId = :locationId AND bl.buildingId = :buildingId AND f.floorId = :floorId ")
//    List<DeskDetailsDTO> getMeetingRoomDetails(Date date, Time startTime, Time endTime, Integer memberCount);

    Desk findByDeskNumber(String deskNumber);
}

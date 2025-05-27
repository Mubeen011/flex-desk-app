package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;


@Data
@NoArgsConstructor
public class ActiveBookingCardDTO {

    Integer bookingId;
    String locationName;
    String buildingName;
    String floorNumber;
    Integer floorId;
    String deskNumber;
    Date bookingDate;
    Time startTime;
    Time endTime;
    Boolean status;
    public ActiveBookingCardDTO(Integer bookingId, String locationName, String buildingName, String floorNumber, Integer floorId, String deskNumber, Date bookingDate, Time startTime, Time endTime,Boolean status) {
        this.bookingId = bookingId;
        this.locationName = locationName;
        this.buildingName = buildingName;
        this.floorNumber = floorNumber;
        this.floorId = floorId;
        this.deskNumber = Integer.toString(Integer.parseInt(deskNumber) - (floorId * 100));
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status=status;
    }



}

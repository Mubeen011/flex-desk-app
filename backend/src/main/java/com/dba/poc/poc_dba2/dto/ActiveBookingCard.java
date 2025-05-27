package com.dba.poc.poc_dba2.dto;


import com.dba.poc.poc_dba2.entity.Desk;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

import com.dba.poc.poc_dba2.entity.Desk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.print.Book;
import java.util.Collections;
import java.util.List;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class ActiveBookingCard {
    private String deskNumber;
    private String description;
    private String buildingName;
    private String locationName;
    private int floorId;
    private Desk.Status status;
    private int capacity;
    private String deskType;
    private List<BookingDTO> bookings;

    public ActiveBookingCard(String deskNumber, String description, String buildingName, String locationName, int floorId, Desk.Status status, int capacity, String deskType, BookingDTO booking) {
        this.deskNumber = Integer.toString(Integer.parseInt(deskNumber) - (floorId * 100));
        this.description = description;
        this.buildingName = buildingName;
        this.locationName = locationName;
        this.floorId = floorId;
        this.status = status;
        this.capacity = capacity;
        this.deskType = deskType;
        this.bookings = Collections.singletonList(booking);
    }

}

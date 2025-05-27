package com.dba.poc.poc_dba2.dto;

import com.dba.poc.poc_dba2.entity.Desk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.print.Book;
import java.util.List;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class DesksDTO {
    private String deskNumber;
    private int floorId;
    private Desk.Status status;
    private int capacity;
    private String deskType;
    private List<BookingDTO> bookings;

    public DesksDTO(String deskNumber, int floorId, Desk.Status status, int capacity, String deskType) {
        this.deskNumber = Integer.toString(Integer.parseInt(deskNumber) - (floorId * 100));
        this.floorId = floorId;
        this.status = status;
        this.capacity = capacity;
        this.deskType = deskType;
    }

    public DesksDTO(String deskNumber, int floorId, Desk.Status status, int capacity, String deskType, List<BookingDTO> bookings) {
        this.deskNumber = Integer.toString(Integer.parseInt(deskNumber) - (floorId * 100));
        this.floorId = floorId;
        this.status = status;
        this.capacity = capacity;
        this.deskType = deskType;
        this.bookings = bookings;
    }
}

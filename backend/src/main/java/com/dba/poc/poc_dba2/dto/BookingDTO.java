package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private int bookingId;
    private String bookedByEmail;
    private String bookedByFirstName;
    private String bookedByLastName;
    private Date bookingDate;
    private Time startTime;
    private Time endTime;
}

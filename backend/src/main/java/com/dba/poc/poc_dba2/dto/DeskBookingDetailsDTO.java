package com.dba.poc.poc_dba2.dto;

import com.dba.poc.poc_dba2.entity.Desk;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Date;
import java.sql.Time;

@Data
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
public class DeskBookingDetailsDTO {
    private int deskId;
    private String deskNumber;
    private String bookedByFirstName;
    private String bookedByLastName;
}

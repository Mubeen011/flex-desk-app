package com.dba.poc.poc_dba2.dto;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Data
@Slf4j
public class BookDeskDTO {
    private String email;
    private String firstName;
    private String lastName;
    private List<String> selectedDesks;
    private Time startTime;
    private Time endTime;
    private List<Date> selectedDates;
    private String locationName;
    private String buildingName;
    private String floorName;
    private String department;

}

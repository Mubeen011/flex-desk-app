package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DayDetailsDTO {
    private String location;
    private String building;
    private String floor;
//    private String startTime;
//    private String endTime;
    private String isCheckedIn;
    private String scheduleId;
    private Long bookingsCount;

}

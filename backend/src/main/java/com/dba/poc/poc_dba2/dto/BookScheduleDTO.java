package com.dba.poc.poc_dba2.dto;


import lombok.Data;

import java.sql.Date;

@Data
public class BookScheduleDTO {
    String email;
    String locationName;
    String buildingName;
    String floorName;
    Date date;
//    String startTime;
//    String endTime;
}

package com.dba.poc.poc_dba2.dto;


import lombok.Data;

import java.sql.Date;

@Data
public class BookMultipleScheduleDTO {
    String email;
    String locationName;
    String buildingName;
    String floorName;
    Date startDate;
    Date endDate;
//    String startTime;
//    String endTime;
}

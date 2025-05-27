package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDTO {
    private String firstName;
    private String lastName;
    private String deskNumber;
    private String locationName;
    private String buildingName;
    private String description;
    private int floorId;
    private Date date;
    private Time startTime;
    private Time endTime;
//    private String

    public SearchResultDTO(String firstName, String lastName, String deskNumber, String locationName, String buildingName, String description, int floorId, Date date ,Time startTime, Time endTime) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.deskNumber = Integer.toString(Integer.parseInt(deskNumber) - (floorId * 100));
        this.locationName = locationName;
        this.buildingName = buildingName;
        this.description = description;
        this.floorId = floorId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}

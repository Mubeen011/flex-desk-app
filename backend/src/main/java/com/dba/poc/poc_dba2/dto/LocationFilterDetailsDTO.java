package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationFilterDetailsDTO {
    private String locationName;
    private String buildingName;
    private String floorName;

//    public String getLocationName() {
//        return locationName;
//    }
//
//    public void setLocationName(String locationName) {
//        this.locationName = locationName;
//    }
//
//    public String getBuildingName() {
//        return buildingName;
//    }
//
//    public void setBuildingName(String buildingName) {
//        this.buildingName = buildingName;
//    }
//
//    public String getFloorName() {
//        return floorName;
//    }
//
//    public void setFloorName(String floorName) {
//        this.floorName = floorName;
//    }
}

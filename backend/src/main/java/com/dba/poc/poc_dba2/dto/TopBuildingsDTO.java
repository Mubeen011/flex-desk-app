package com.dba.poc.poc_dba2.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopBuildingsDTO {
    String buildingName;
    Long totalBookings;
}

package com.dba.poc.poc_dba2.dto;

import com.dba.poc.poc_dba2.dto.DayDetailsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class WeeklyUserLocationDTO {
    private String name;

    private DayDetailsDTO mon;
    private DayDetailsDTO tue;
    private DayDetailsDTO wed;
    private DayDetailsDTO thu;
    private DayDetailsDTO fri;
    private DayDetailsDTO sat;
    private DayDetailsDTO sun;

    private String department;
    public WeeklyUserLocationDTO(String name) {
        this.name = name;
    }
}

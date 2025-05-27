package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class PeopleInfoDTO {
    String firstName;
    String lastName;
    String department;
    String email;
    Integer userId;


}

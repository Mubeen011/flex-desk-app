package com.dba.poc.poc_dba2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InOfficeDetailsDTO {
    private String firstName;
    private String lastName;
    private String deskNumber;
    private String avatarSvg;
}

package com.dba.poc.poc_dba2.dto;

import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.util.Access;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGroupDTO {
    private String adminEmail;
    private String title;
    private String description;
//    private String access;
    private List<User> members;
}

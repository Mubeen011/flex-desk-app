package com.dba.poc.poc_dba2.dto;

import com.dba.poc.poc_dba2.util.Access;
import com.dba.poc.poc_dba2.util.GroupType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupInfoDTO {
    private int groupId;
    private String title;
    private String description;
    private Access access;
    private GroupType groupType;
    private int memberCount;
    private int invitedCount;
    private String adminFirstName;
    private String adminLastName;
  //  private List<String> members;
}

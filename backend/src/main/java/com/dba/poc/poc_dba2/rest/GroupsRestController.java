package com.dba.poc.poc_dba2.rest;

import com.dba.poc.poc_dba2.dto.*;
import com.dba.poc.poc_dba2.dto.GroupsInfoDTO;
import com.dba.poc.poc_dba2.entity.Desk;
import com.dba.poc.poc_dba2.entity.GroupInfo;
import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.service.GroupInfoService;
import com.dba.poc.poc_dba2.service.GroupMemberService;
import com.dba.poc.poc_dba2.util.GroupMemberId;
import com.dba.poc.poc_dba2.util.Response;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.engine.groups.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@Slf4j
@RequestMapping(path = "/flexdesk", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "*")
public class GroupsRestController {
    @Autowired
    private GroupInfoService groupInfoService;

    @Autowired
    private GroupMemberService groupMemberService;

    @RequestMapping("/getGroupsInfoByType")
    public List<GroupsInfoDTO> getGroupsInfoByType(@RequestParam("groupType") String groupType) {
        return groupInfoService.getGroupsInfoByTypeService(groupType);
    }

    @RequestMapping("/getGroupInfo")
    public GroupInfoDTO getGroupInfo(@RequestParam("groupId") Integer groupId) {
        return groupInfoService.getGroupInfoService(groupId);
    }

    @RequestMapping("/createGroup")
    public ResponseEntity<Response> createGroup(@RequestBody CreateGroupDTO createGroupDTO) {
        return groupInfoService.createGroupResponseService(createGroupDTO);
    }

    @RequestMapping("/getGroupMembersInfo")
    public List<GroupMemberDTO> getGroupMembersInfo(@RequestParam("groupId") Integer groupId) {
        return groupMemberService.getGroupMembersInfoService(groupId);
    }

    @RequestMapping("/addMembersToGroup")
    public ResponseEntity<Response> addMembersToGroup(@RequestBody List<User> members, @RequestParam("groupId") Integer groupId) {
        return groupMemberService.addMembersToGroupService(members, groupId);
    }

    @RequestMapping("/removeMembersFromGroup")
    public ResponseEntity<Response> removeMembersFromGroup(@RequestBody List<User> members, Integer groupId) {
        return groupMemberService.removeMembersFromGroupService(members, groupId);
    }

    @RequestMapping("/checkSpacesForGroup")
    public List<DesksDTO> checkSpacesForGroup(@RequestParam Integer groupId, @RequestParam String locationName,
                                              @RequestParam String buildingName,
                                              @RequestParam String
                                                      description,
                                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String date) {
        Date sqlDate = Date.valueOf(date);
        return groupInfoService.checkSpacesForGroupService(groupId, locationName, buildingName, description, sqlDate);
    }

    @RequestMapping("/editGroup")
    public ResponseEntity<Response> editGroup(@RequestBody GroupInfoDTO groupInfoDTO) {
        return groupInfoService.editGroupService(groupInfoDTO);
    }

    @RequestMapping("/deleteGroup")
    public ResponseEntity<Response> deleteGroup(@RequestParam("groupId") Integer groupId) {
        return groupInfoService.deleteGroupService(groupId);
    }


    @RequestMapping("/bookGroup")
    public ResponseEntity<Response> bookGroup(@RequestParam Integer groupId, @RequestBody BookDeskDTO bookDeskDTO) {
        return groupInfoService.bookGroupService(groupId, bookDeskDTO);
    }


}

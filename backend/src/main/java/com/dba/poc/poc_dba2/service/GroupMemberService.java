package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.GroupInfoDTO;
import com.dba.poc.poc_dba2.dto.GroupMemberDTO;
import com.dba.poc.poc_dba2.entity.GroupInfo;
import com.dba.poc.poc_dba2.entity.GroupMember;
import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.repository.GroupInfoRepository;
import com.dba.poc.poc_dba2.repository.GroupMemberRepository;
import com.dba.poc.poc_dba2.repository.UserRepository;
import com.dba.poc.poc_dba2.util.GroupMemberId;
import com.dba.poc.poc_dba2.util.Response;
import com.dba.poc.poc_dba2.util.Role;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class GroupMemberService {
    @Autowired
    GroupMemberRepository groupMemberRepository;

    @Autowired
    GroupInfoRepository groupInfoRepository;

    @Autowired
    UserRepository userRepository;

    public void addMembersService(GroupInfo groupInfo, List<User> members) {
        for (User member : members) {
            User userReq = userRepository.findByEmail(member.getEmail());
            GroupMember newMember = new GroupMember();
            log.info(userReq.toString());
            GroupMemberId groupMemberId = new GroupMemberId(groupInfo.getGroupId(), userReq.getUserId());
            newMember.setId(groupMemberId);
            log.info(groupMemberId.toString());
            newMember.setGroupInfo(groupInfo);
            newMember.setUser(userReq);
            newMember.setRole(Role.member);
            newMember.setJoinDate(Date.valueOf(LocalDate.now()));
            groupMemberRepository.save(newMember);
        }
    }

    public List<GroupMemberDTO> getGroupMembersInfoService(Integer groupId) {
        return groupMemberRepository.getGroupMembersInfo(groupId);
    }

    public boolean memberExistsInGroup(Integer groupId, User memberDTO) {
        User user = userRepository.findByEmail(memberDTO.getEmail());
        if (user == null) {
            throw new RuntimeException("User doesn't exist: " + memberDTO.getEmail());
        }
        log.info(user.toString());
        GroupMember groupMember = groupMemberRepository.memberExistsInGroup(groupId, user.getUserId());
        if (groupMember == null) {
            return false;
        }
        return true;
    }

    public ResponseEntity<Response> addMembersToGroupService(List<User> members, Integer groupId) {
        Response response = new Response();
        List<String> faultyUsers = new ArrayList<>();
        try {
            for (User memberDTO : members) {
                if (memberExistsInGroup(groupId, memberDTO)) {
                    faultyUsers.add("User already exists in this group: " + memberDTO.getFirstName() + " " + memberDTO.getLastName());
                    continue;
                }
                User userReq = userRepository.findByEmail(memberDTO.getEmail());
                if (userReq == null) {
                    faultyUsers.add("User not found with email: " + memberDTO.getEmail());
                    continue;
                }
                GroupInfo groupInfo = groupInfoRepository.findByGroupId(groupId);
                if (groupInfo == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new Response("404", "Group not found with ID: " + groupId));
                }
                GroupMember newMember = new GroupMember();
                GroupMemberId groupMemberId = new GroupMemberId(groupId, memberDTO.getUserId());
                newMember.setId(groupMemberId);
                newMember.setGroupInfo(groupInfo);
                newMember.setUser(userReq);
                newMember.setRole(Role.member);
                newMember.setJoinDate(Date.valueOf(LocalDate.now()));
                groupInfo.setMemberCount(groupInfo.getMemberCount() + 1);
                log.info(groupInfo.toString());
                groupMemberRepository.save(newMember);
            }
            if (!faultyUsers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new Response("400", String.join("; ", faultyUsers)));
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new Response("200", "Members added successfully!"));
        } catch (Exception e) {
            log.error("Error occurred while adding members to group", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("500", "Internal Server Error: " + e.getMessage()));
        }
    }

    public ResponseEntity<Response> removeMembersFromGroupService(List<User> members, Integer groupId) {
        Response response = new Response();
        List<String> faultyUsers = new ArrayList<>();
        try {
            for (User memberDTO : members) {
                if (!memberExistsInGroup(groupId, memberDTO)) {
                    faultyUsers.add("User doesn't exist in this group: " + memberDTO.getFirstName() + " " + memberDTO.getLastName());
                    continue;
                }
                User userReq = userRepository.findByEmail(memberDTO.getEmail());
                if (userReq == null) {
                    faultyUsers.add("User not found with email: " + memberDTO.getEmail());
                    continue;
                }
                GroupInfo groupInfo = groupInfoRepository.findByGroupId(groupId);
                if (groupInfo == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new Response("404", "Group not found with ID: " + groupId));
                }
                GroupMember newMember = new GroupMember();
                GroupMemberId groupMemberId = new GroupMemberId(groupId, userReq.getUserId());
                log.info(groupMemberId.toString());
//               int deletedRows = groupMemberRepository.removeMember(groupId, memberDTO.getUserId());
               int deletedRows = groupMemberRepository.removeMember(groupMemberId);
               if(deletedRows == 0) {
                   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("500", "No deletions done"));
               }
                groupInfo.setMemberCount(groupInfo.getMemberCount() - 1);
             //   log.info(groupInfo.toString());
              //  groupMemberRepository.save(newMember);
            }
            if (!faultyUsers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new Response("400", String.join("; ", faultyUsers)));
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new Response("200", "Members deleted successfully!"));
        } catch (Exception e) {
            log.error("Error occurred while deleting members to group", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("500", "Internal Server Error: " + e.getMessage()));
        }
    }
}

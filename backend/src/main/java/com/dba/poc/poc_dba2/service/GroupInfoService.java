package com.dba.poc.poc_dba2.service;

import com.dba.poc.poc_dba2.dto.*;
import com.dba.poc.poc_dba2.dto.GroupsInfoDTO;
import com.dba.poc.poc_dba2.entity.Desk;
import com.dba.poc.poc_dba2.entity.Floor;
import com.dba.poc.poc_dba2.entity.GroupInfo;
import com.dba.poc.poc_dba2.entity.User;
import com.dba.poc.poc_dba2.repository.*;
import com.dba.poc.poc_dba2.util.Access;
import com.dba.poc.poc_dba2.util.GroupMemberId;
import com.dba.poc.poc_dba2.util.GroupType;
import com.dba.poc.poc_dba2.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.awt.print.Book;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class GroupInfoService {
    @Autowired
    GroupMemberService groupMemberService;

    @Autowired
    DeskService deskService;


    @Autowired
    BookingService bookingService;

    @Autowired
    GroupInfoRepository groupInfoRepository;

    @Autowired
    GroupMemberRepository groupMemberRepository;

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FloorRepository floorRepository;

    public List<GroupsInfoDTO> getGroupsInfoByTypeService(String groupType) {
        GroupType type = GroupType.valueOf(groupType);
        log.info(type.toString());
        return groupInfoRepository.getGroupsInfoByType(type);
    }


    public GroupInfoDTO getGroupInfoService(Integer groupId) {
        return groupInfoRepository.getByGroupId(groupId);
    }

    public GroupInfo createGroup(CreateGroupDTO createGroupDTO) {
        GroupInfo groupInfo = new GroupInfo();
        groupInfo.setTitle(createGroupDTO.getTitle());
        groupInfo.setDescription(createGroupDTO.getDescription());
        groupInfo.setMemberCount(createGroupDTO.getMembers().size());
        //   groupInfo.setAccess(Access.valueOf(createGroupDTO.getAccess()));
        User admin = userRepository.findByEmail(createGroupDTO.getAdminEmail());
        groupInfo.setAdmin(admin);
//        groupInfo.setCreatedBy(groupInfo.getAdmin());
        return groupInfoRepository.save(groupInfo);
    }

    public ResponseEntity<Response> createGroupResponseService(CreateGroupDTO createGroupDTO) {
        Response response = new Response();
        response.setStatusCode("200");
        response.setStatusMsg("Group created successfully!");
        String postTitle = createGroupDTO.getTitle();
        if (groupInfoRepository.findByTitle(postTitle) != null) {
            response.setStatusCode("400");
            response.setStatusMsg("A group with the title - " + postTitle + " already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userRepository.findByEmail(createGroupDTO.getAdminEmail()) == null) {
            response.setStatusCode("400");
            response.setStatusMsg("The admin's email - " + createGroupDTO.getAdminEmail() + " doesn't exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        List<User> members = createGroupDTO.getMembers();
        List<String> faultyUsers = new ArrayList<>();
        for (User member : members) {
            if (userRepository.findByEmail(member.getEmail()) == null) {
                response.setStatusCode("400");
                faultyUsers.add(member.getEmail());
                members.remove(member);
            }
        }
        if (response.getStatusCode().equals("400")) {
            response.setStatusMsg("These emails don't exist and cannot be added into the " + createGroupDTO.getTitle() + " group: " + faultyUsers.toString());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        GroupInfo groupInfo = createGroup(createGroupDTO);
        groupMemberService.addMembersService(groupInfo, members);
        response.setStatusCode("200");
        response.setStatusMsg("Group created successfully!");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    public List<DesksDTO> checkSpacesForGroupService(Integer groupId, String locationName, String buildingName, String description, Date date) {
        GroupInfo groupInfo = groupInfoRepository.findByGroupId(groupId);
        Integer floorId = deskService.getFloorIdService(locationName, buildingName, description);
        return deskService.getMeetingRoomDetailsService(date, floorId, groupInfo.getMemberCount());
    }

    public ResponseEntity<Response> editGroupService(GroupInfoDTO groupInfoDTO) {
        int updated = groupInfoRepository.editGroup(groupInfoDTO);
        Response response = new Response();
        if (updated > 0) {
            response.setStatusMsg("Updated successfully!");
            response.setStatusCode("200");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.setStatusCode("400");
        response.setStatusMsg("Update operation failed");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    public ResponseEntity<Response> deleteGroupService(Integer groupId) {
        Response response = new Response();
        List<GroupMemberDTO> members = groupMemberService.getGroupMembersInfoService(groupId);
        List<User> memberDetails = new ArrayList<>();
        int deletedRows = 0;
        for (GroupMemberDTO groupMemberDTO : members) {
            User memberDetail = userRepository.getById(groupMemberDTO.getUserId());
            memberDetails.add(memberDetail);
            GroupMemberId groupMemberId = new GroupMemberId(groupId, memberDetail.getUserId());
            deletedRows += groupMemberRepository.removeMember(groupMemberId);
        }
        log.info("Members deleted count: " + deletedRows);
        int deletions = groupInfoRepository.deleteGroup(groupId);
        if (deletions == 0) {
            response.setStatusMsg("Deletion failed, check your request.");
            response.setStatusCode("400");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.setStatusCode("200");
        response.setStatusMsg("Deletion successful!");
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    public ResponseEntity<Response> bookGroupService(Integer groupId, BookDeskDTO bookDeskDTO) {
        Response response = new Response();
        GroupInfo groupInfo = groupInfoRepository.findByGroupId(groupId);
        if (groupInfo == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Group doesn't exist, check your request.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        Floor floor = floorRepository.findByDescription(bookDeskDTO.getFloorName());
        if (floor == null) {
            response.setStatusCode("400");
            response.setStatusMsg("Invalid floor name");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        int floorId = floor.getFloorId();

        for (String deskNumber : bookDeskDTO.getSelectedDesks()) {
            deskNumber = Integer.toString(Integer.valueOf(deskNumber) + (floorId * 100));
            Desk desk = deskRepository.findByDeskNumber(deskNumber);
            if (desk.getCapacity() < groupInfo.getMemberCount()) {
                response.setStatusCode("400");
                response.setStatusMsg("Selected workspace can't accommodate the group , check your request.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            //  deskNumber = Integer.toString(Integer.valueOf(deskNumber) - (floorId * 100));
        }
        log.info(bookDeskDTO.getSelectedDesks().toString());
        User reqAdmin = groupInfo.getAdmin();
        reqAdmin = userRepository.getById(reqAdmin.getUserId());
        if (!bookDeskDTO.getEmail().equals(reqAdmin.getEmail())) {
            response.setStatusCode("400");
            response.setStatusMsg("Email in the request doesn't match with the admin's email.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        ResponseEntity<Response> responseEntity = bookingService.bookDeskResponseService(bookDeskDTO);
        log.info("Original Desk numbers are: " + bookDeskDTO.getSelectedDesks().toString());


        log.info( "Original Desk numbers are: " +  bookDeskDTO.getSelectedDesks().toString());

        List<Integer> groupMemberIds = groupMemberRepository.findUsersByGroupId(groupInfo.getGroupId());

       List<String> o = new ArrayList<>();
        for (Integer groupMemberId : groupMemberIds) {
            User user = userRepository.getById(groupMemberId);
            bookDeskDTO.setEmail(user.getEmail());
            bookDeskDTO.setFirstName(user.getFirstName());
            bookDeskDTO.setLastName(user.getLastName());
            responseEntity = bookingService.bookDeskResponseService(bookDeskDTO);

        }

        return responseEntity;
    }

//    public List<BookingDTO> viewGroupBookingsService(Integer groupId){
//
//    }
}

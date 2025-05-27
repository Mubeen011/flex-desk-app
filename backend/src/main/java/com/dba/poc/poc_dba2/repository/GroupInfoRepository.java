package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.GroupInfoDTO;
import com.dba.poc.poc_dba2.dto.GroupsInfoDTO;
import com.dba.poc.poc_dba2.entity.GroupInfo;
import com.dba.poc.poc_dba2.util.GroupType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GroupInfoRepository extends JpaRepository<GroupInfo, Integer> {
    @Query("SELECT new com.dba.poc.poc_dba2.dto.GroupsInfoDTO(g.groupId, g.title, g.access, g.groupType, g.memberCount, COALESCE(u.firstName, ''), COALESCE(u.lastName, '')) FROM GroupInfo g JOIN User u ON g.admin.userId = u.userId WHERE g.groupType = :type")
    List<GroupsInfoDTO> getGroupsInfoByType(GroupType type);

    GroupInfo findByGroupType(GroupType groupType);

    @Query("SELECT new com.dba.poc.poc_dba2.dto.GroupInfoDTO(g.groupId, g.title, g.description, g.access, g.groupType, g.memberCount, g.invitedCount, COALESCE(u.firstName, ''), COALESCE(u.lastName, '')) FROM GroupInfo g JOIN User u ON g.admin.userId = u.userId WHERE g.groupId = :groupId")
    GroupInfoDTO getByGroupId(Integer groupId);

    @Modifying
    @Transactional
    @Query("UPDATE GroupInfo g SET g.title = :#{#groupInfoDTO.title}, g.description = :#{#groupInfoDTO.description} WHERE g.groupId = :#{#groupInfoDTO.groupId}")
    int editGroup(GroupInfoDTO groupInfoDTO);

    GroupInfo findByTitle(String postTitle);

    GroupInfo findByGroupId(Integer groupId);

    @Modifying
    @Transactional
    @Query("DELETE FROM GroupInfo g WHERE g.groupId = :groupId")
    Integer deleteGroup(Integer groupId);
}

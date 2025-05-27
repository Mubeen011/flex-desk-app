package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.GroupMemberDTO;
import com.dba.poc.poc_dba2.entity.GroupMember;
import com.dba.poc.poc_dba2.util.GroupMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, GroupMemberId> {
    @Query("SELECT new com.dba.poc.poc_dba2.dto.GroupMemberDTO(u.userId, COALESCE(u.firstName, ''), COALESCE(u.lastName, ''), gm.joinDate, gm.role) FROM GroupMember gm JOIN User u ON gm.user.userId = u.userId WHERE gm.groupInfo.groupId = :groupId")
    List<GroupMemberDTO> getGroupMembersInfo(Integer groupId);

    @Query("SELECT gm FROM GroupMember gm WHERE gm.groupInfo.groupId = :groupId AND gm.user.userId = :userId")
    GroupMember memberExistsInGroup(Integer groupId, Integer userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM GroupMember gm WHERE gm.id = :groupMemberId")
    int removeMember(GroupMemberId groupMemberId);
	
	@Query("SELECT gm.user.userId FROM GroupMember gm WHERE gm.groupInfo.groupId = :groupId")
    List<Integer> findUsersByGroupId(int groupId);
}

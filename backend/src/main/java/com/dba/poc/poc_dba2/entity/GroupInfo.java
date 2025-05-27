package com.dba.poc.poc_dba2.entity;

import com.dba.poc.poc_dba2.util.Access;
import com.dba.poc.poc_dba2.util.GroupType;
import com.dba.poc.poc_dba2.util.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Slf4j
@Data
@Entity
@Table(name = "groupinfo")
public class GroupInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private int groupId;

    @Column(name="title", length = 255)
    private String title;

    @Column(name="description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "access")
    private Access access = Access.Private;

    @Enumerated(EnumType.STRING)
    @Column(name = "group_type")
    private GroupType groupType = GroupType.Team;

    @Column(name = "member_count")
    private int memberCount;

    @Column(name = "invited_count")
    private int invitedCount;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = true)
    private Booking booking;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="created_by", nullable = false)
    private User createdBy;

    public void setAdmin(User admin) {
        this.admin = admin;
        if (this.createdBy == null) {
            this.createdBy = admin;
        }
    }
}

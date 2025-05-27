package com.dba.poc.poc_dba2.entity;

import com.dba.poc.poc_dba2.util.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;


    @Column(name="first_name", length = 100)
    private String firstName;

    @Column(name="last_name", length = 100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name="email", nullable = false, unique = true, length =100)
    private String email;

    @Column(name="pwd", length = 100)
    private String pwd;

    @Column(name="phone", unique = true, length = 50)
    private String phone;

    @Column(name = "department", length = 50)
    private String department;

    @Column(name = "login_type")
    private String loginType;

    @OneToOne
    @JoinColumn(name = "avatar_id", nullable = true)
    private Avatars avatar;

}

package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Entity
@Table(name = "avatars")
public class Avatars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "avatar_id")
    private int avatarId;

    @Lob
    @Column(name="avatar_svg", columnDefinition="TEXT")
    private String avatarSvg;


}

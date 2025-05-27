package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "building")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buildingId;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "building_name", length = 100)
    private String buildingName;
}

package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "floor")
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int floorId;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    Building building;

    @Column(name = "floor_number",nullable = false)
    private int floorNumber;

    private String description;

    private int capacity;
}

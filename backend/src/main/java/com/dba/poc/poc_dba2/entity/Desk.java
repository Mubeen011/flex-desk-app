package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "desk")
public class Desk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deskId;

    @ManyToOne
    @JoinColumn(name = "floor_id", nullable = false)
    private Floor floor;

    @Column(name = "desk_number", nullable = false)
    private String deskNumber;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        available, unavailable, partially_unavailable;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "occupant_id", nullable = true)
    private User occupant;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "desk_type", nullable = false)
    private String deskType;

}

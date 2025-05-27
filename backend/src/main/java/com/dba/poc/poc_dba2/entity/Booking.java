package com.dba.poc.poc_dba2.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@Entity
@Table(name = "booking")
public class Booking extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "floor_id", nullable = false)
    private Floor floor;

    @ManyToOne
    @JoinColumn(name = "desk_id", nullable = false)
    private Desk desk;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

	@ManyToOne
    @JoinColumn(name = "schedule_id")
    private WorkSchedule workSchedule;
    @Column(name = "booking_date", nullable = false)
    private Date bookingDate;

    @Column(name = "start_time", nullable = false)
    private Time startTime;

    @Column(name = "end_time", nullable = false)
    private Time endTime;

    @Column(nullable = false)
    private Boolean status;

    @Column(name="booking_type")
    private String bookingType;

}

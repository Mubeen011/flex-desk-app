//package com.dba.poc.poc_dba2.dto;
//
//import com.dba.poc.poc_dba2.entity.Desk;
//
//import java.sql.Date;
//import java.util.List;
//import java.util.stream.IntStream;
//
//public class DeskDetailsTimeSlotDTO {
//    private String deskNumber;
//    private Desk.Status status;
//    private int capacity;
//    private Integer bookingId;
//    private String bookedByEmail;
//    private String bookedByFirstName;
//    private String bookedByLastName;
//    private Date date;
//    private List<TimeSlotDTO> timeSlots;
//
//
//
//    public DeskDetailsTimeSlotDTO() {
//        this.timeSlots = generate24HourTimeSlots();
//    }
//
//    public DeskDetailsTimeSlotDTO(String deskNumber,Desk.Status status, int capacity, Integer bookingId,
//                                 String bookedByEmail, String bookedByFirstName, String bookedByLastName) {
//        this.deskNumber = deskNumber;
//        this.status = status;
//        this.capacity = capacity;
//        this.bookingId = bookingId;
//        this.bookedByEmail = bookedByEmail;
//        this.bookedByFirstName = bookedByFirstName;
//        this.bookedByLastName = bookedByLastName;
//        this.timeSlots = generate24HourTimeSlots();
//    }
//}

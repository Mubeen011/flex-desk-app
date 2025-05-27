package com.dba.poc.poc_dba2.util;


import com.dba.poc.poc_dba2.repository.DashboardRepository;

import com.dba.poc.poc_dba2.service.DashboardService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
@EnableScheduling
public class BookingScheduler {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private DashboardService dashboardService;

    @Scheduled(cron = "*/30 * * * * *")
    public void scheduleMoveCompletedBookings() {

       dashboardService.checkExpiredBookings();
    }


}

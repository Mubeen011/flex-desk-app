package com.dba.poc.poc_dba2.rest;


import com.dba.poc.poc_dba2.dto.TopBuildingsDTO;
import com.dba.poc.poc_dba2.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flexdesk")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    AnalyticsService analyticsService;


    @GetMapping("/lineChart")
    public Map<String, int[]> getMonthlyBookings() {
        return analyticsService.getMonthlyBookingsPerBuilding();
    }
    @GetMapping("donut1")
    public List<Integer> getBookedCancelledPercentage(){
        return analyticsService.getBookedCancelledPercentage();
    }
    @GetMapping("donut2")
    public List<Integer> getCheckInPercentage(){
        return analyticsService.getCheckInPercentage();
    }
    @GetMapping("horizontalBar")
    public List<TopBuildingsDTO> getTopBuildings(){
        return analyticsService.getTopBuildings();
    }
    @GetMapping("heatMap")
    public Map<String, int[]> getHeatMapData(){
        return analyticsService.getHeatMapData();
    }
}

package com.dba.poc.poc_dba2.rest;


import com.dba.poc.poc_dba2.dto.PeopleInfoDTO;
import com.dba.poc.poc_dba2.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flexdesk")
@CrossOrigin(origins = "*")
public class PeopleController {

    @Autowired
    private PeopleService peopleService;
    @RequestMapping("/getPeopleInfo")
    public Map<String, String> getUserWeeklyLocations(Integer userId){
         return peopleService.getUserWeeklyLocations(userId);
    }
    @RequestMapping("/getPeopleList")
    public List<PeopleInfoDTO> getPeopleList(String searchText,String email,Boolean isTeamView){
        return peopleService.getPeopleListService(searchText,email,isTeamView);
    }


}

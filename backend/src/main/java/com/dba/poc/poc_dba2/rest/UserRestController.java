package com.dba.poc.poc_dba2.rest;

import com.dba.poc.poc_dba2.dto.UserDTO;
import com.dba.poc.poc_dba2.repository.UserRepository;
import com.dba.poc.poc_dba2.service.UserService;
import com.dba.poc.poc_dba2.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping(path = "/flexdesk", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    private UserService userService;

    @RequestMapping("/addUser")
    private ResponseEntity<Response> addUser(@RequestBody UserDTO userDTO){
        return userService.addUser(userDTO);
    }

}

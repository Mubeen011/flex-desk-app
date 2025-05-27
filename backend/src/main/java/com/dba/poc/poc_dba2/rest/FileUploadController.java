//package com.dba.poc.poc_dba2.rest;
//
//
//import com.dba.poc.poc_dba2.dto.BookDeskDTO;
//import com.dba.poc.poc_dba2.service.FileUploadService;
//import com.dba.poc.poc_dba2.util.Response;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/flexdesk")
//@CrossOrigin(origins = "*")
//public class FileUploadController {
//
//    @Autowired
//    private FileUploadService fileUploadService;
//    @RequestMapping("/bookBulkDesk")
//    public ResponseEntity<Response> bookBulkDesks(@RequestParam String email, @RequestBody List<BookDeskDTO> bulkDesks) {
//        ResponseEntity<Response> finalResponseEntity = fileUploadService.bookBulkDesksService(email, bulkDesks);
//        return finalResponseEntity;
//    }
//}

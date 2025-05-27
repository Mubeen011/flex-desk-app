//package com.dba.poc.poc_dba2.service;
//
//
//import com.dba.poc.poc_dba2.dto.BookDeskDTO;
//import com.dba.poc.poc_dba2.util.Response;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@Service
//public class FileUploadService {
//    @Autowired
//    private BookingService bookingService;
//    public ResponseEntity<Response> bookBulkDesksService(String email, List<BookDeskDTO> bulkDesks){
//        Response response = new Response();
//        response.setStatusCode("400");
//        response.setStatusMsg("Bulk booking failed");
//        ResponseEntity<Response> responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        List<BookDeskDTO> faultyBookings = new ArrayList<BookDeskDTO>();
//        int count = 0;
//        for (BookDeskDTO desk : bulkDesks) {
//            count++;
//            responseEntity = bookingService.bookDeskResponseService(desk);
//            log.info(String.valueOf(responseEntity.getStatusCode()));
//            if(!(responseEntity.getBody().getStatusCode().equals("200"))){
//                response = responseEntity.getBody();
//                response.setStatusMsg(response.getStatusMsg() + " at the record: " + count);
//                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//                break;
//            }
//        }
//        return responseEntity;
//    }
//}

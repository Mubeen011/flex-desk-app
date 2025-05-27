package com.dba.poc.poc_dba2.rest;

import com.dba.poc.poc_dba2.dto.BookDeskDTO;
import com.dba.poc.poc_dba2.dto.SearchResultDTO;
import com.dba.poc.poc_dba2.dto.SearchUserDTO;
import com.dba.poc.poc_dba2.repository.BookingRepository;
import com.dba.poc.poc_dba2.repository.FloorRepository;
import com.dba.poc.poc_dba2.service.BookingService;
import com.dba.poc.poc_dba2.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.directory.SearchResult;
import java.sql.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "/flexdesk", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "*")
public class BookingRestController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/bookDesk")
    public ResponseEntity<Response> bookDesk(@RequestBody BookDeskDTO bookDeskDTO) {
        log.info(bookDeskDTO.toString());
        return bookingService.bookDeskResponseService(bookDeskDTO);
    }

    @PostMapping("/bookBulkDesks")
    public List<String> bookBulkDesks(@RequestParam String email, @RequestBody List<BookDeskDTO> bulkDesks) {
        return bookingService.bookBulkDesksService(email, bulkDesks);
    }

    @RequestMapping("/bookInDateRange")
    public List<ResponseEntity<Response>> bookDeskDateRange(@RequestBody BookDeskDTO bookInDateRangeDTO){
        log.info(bookInDateRangeDTO.toString());
        return bookingService.bookInDateRange(bookInDateRangeDTO);
    }

    @GetMapping("/searchUserBookings")
    public List<SearchUserDTO> searchUserBookings(@RequestParam("searchText") String searchText, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String date){
        Date sqlDate = Date.valueOf(date);
        return bookingService.searchUserBookings(searchText, sqlDate);
    }

    @GetMapping("/searchResult")
    public List<SearchResultDTO> searchResult(@RequestParam("userId") int userId, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String date){
        Date sqlDate = Date.valueOf(date);
        return bookingService.searchResult(userId, sqlDate);
    }

}

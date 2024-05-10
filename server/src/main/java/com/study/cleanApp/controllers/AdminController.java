package com.study.cleanApp.controllers;

import com.study.cleanApp.dto.CleanerAdminDTO;
import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/active")
    public ResponseEntity<?> getActiveOrders () {
        List<OrderDTO> dtoList = adminService.getActive();
        return new ResponseEntity<>(dtoList, dtoList == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping("/done")
    public ResponseEntity<?> getDoneOrders () {
        List<OrderDTO> dtoList = adminService.getDone();
        return new ResponseEntity<>(dtoList, dtoList == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping("/cleaners")
    public ResponseEntity<?> getCleaners () {
        List<CleanerAdminDTO> cleanerDTOs = adminService.getCleaners();
        return new ResponseEntity<>(cleanerDTOs, cleanerDTOs == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
}

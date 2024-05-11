package com.study.cleanApp.controllers;

import com.study.cleanApp.dto.CleanerAdminDTO;
import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.CreateCleanerDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
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

    @GetMapping("/cleaner/{id}")
    public ResponseEntity<?> getCleaner(@PathVariable long id) {
        CleanerDTO cleaner = adminService.getCleaner(id);
        return new ResponseEntity<>(cleaner, cleaner == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PostMapping("/cleaner")
    public ResponseEntity<?> createCleaner(@RequestBody CreateCleanerDTO dto) throws NoSuchAlgorithmException {
        CleanerDTO createdCleaner = adminService.addCleaner(dto);
        return new ResponseEntity<>(createdCleaner, createdCleaner == null ? HttpStatus.CONFLICT : HttpStatus.CREATED);
    }
}

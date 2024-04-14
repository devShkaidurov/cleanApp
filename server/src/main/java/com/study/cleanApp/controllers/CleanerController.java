package com.study.cleanApp.controllers;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.cleanApp.dto.CleanerDTO;
import com.study.cleanApp.dto.RegisterUser;
import com.study.cleanApp.services.CleanerService;

@RestController
@RequestMapping("/cleaner")
@CrossOrigin
public class CleanerController {
    @Autowired
    private CleanerService cleanerService;

    @GetMapping("/auth")
    public ResponseEntity<?> auth (@RequestParam("login") Optional<String> login, @RequestParam("password") Optional<String> password) throws NoSuchAlgorithmException {
        CleanerDTO cleaner = cleanerService.auth(login, password);
        return new ResponseEntity<>(cleaner, cleaner == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterUser user) throws NoSuchAlgorithmException {
        CleanerDTO cleaner = cleanerService.register(user);
        return new ResponseEntity<>(cleaner, cleaner == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAll () {
        List<CleanerDTO> cleaners = cleanerService.getAll();
        return new ResponseEntity<>(cleaners, cleaners == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
}

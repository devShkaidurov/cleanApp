package com.study.cleanApp.controllers;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.cleanApp.dto.CustomerDTO;
import com.study.cleanApp.dto.RegisterUser;
import com.study.cleanApp.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/auth")
    private ResponseEntity<?> auth (@RequestParam("login") Optional<String> login, @RequestParam("password") Optional<String> password) throws NoSuchAlgorithmException {
        CustomerDTO customer = customerService.auth(login, password);
        return new ResponseEntity<>(customer, customer == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PostMapping("/register")
    private ResponseEntity<?> register (@RequestBody RegisterUser user) throws NoSuchAlgorithmException {
        CustomerDTO customer = customerService.register(user);
        return new ResponseEntity<>(customer, customer == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
}

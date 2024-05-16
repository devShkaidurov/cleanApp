package com.study.cleanApp.controllers;

import com.study.cleanApp.services.StreetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class StreetController {
    @Autowired
    private StreetService streetService;

    public ResponseEntity<?> getStreet () {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}

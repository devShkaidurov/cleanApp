package com.study.cleanApp.controllers;

import com.study.cleanApp.services.CleanTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CleanTypeController {
    @Autowired
    private CleanTypeService cleanTypeService;

    public ResponseEntity<?> getCleanType () {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}

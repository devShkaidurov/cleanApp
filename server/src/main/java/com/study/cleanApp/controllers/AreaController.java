package com.study.cleanApp.controllers;

import com.study.cleanApp.services.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AreaController {
    @Autowired
    private AreaService areaService;

    public ResponseEntity<?> getArea () {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}

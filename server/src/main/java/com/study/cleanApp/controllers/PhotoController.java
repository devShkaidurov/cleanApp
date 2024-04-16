package com.study.cleanApp.controllers;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.cleanApp.services.PhotoService;

@CrossOrigin
@RestController
@RequestMapping("/{reviewId}/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @GetMapping()
    public ResponseEntity<?> getPhotos (@PathVariable("reviewId") long reviewId) {
        List<byte[]> dto = photoService.getPhotos(reviewId);
        return new ResponseEntity<>(dto, dto == null || dto.size() == 0? HttpStatus.NOT_FOUND : HttpStatus.OK); 
    }
}

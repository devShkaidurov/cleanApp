package com.study.cleanApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.cleanApp.dto.ReviewDTO;
import com.study.cleanApp.services.ReviewService;

@RestController
@RequestMapping("/{orderId}/review")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> addReview (@PathVariable("orderId") long orderId,
        @RequestParam("files") List<MultipartFile> photos, 
        @RequestParam("text") String text,
        @RequestParam("value") double value) {
        ReviewDTO dto = reviewService.addReview(orderId, photos, text, value);
        return new ResponseEntity<>(dto, dto == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getReview (@PathVariable("orderId") long orderId) {
        ReviewDTO dto = reviewService.getReview(orderId);
        return new ResponseEntity<>(dto, dto == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }
}

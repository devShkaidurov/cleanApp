package com.study.cleanApp.dto;

import java.util.Date;
import java.util.List;

import com.study.cleanApp.models.Customer;
import com.study.cleanApp.models.Order;
import com.study.cleanApp.models.Photo;
import com.study.cleanApp.models.Review;

import lombok.Data;

@Data
public class ReviewDTO {
    private long id;
    private String text;
    private double value;
    private List<Photo> photos;
    private Date reviewDate;

    public static Review toEntity (ReviewDTO dto) {
        Review review = new Review();
        review.setId(dto.getId());
        review.setText(dto.getText());
        review.setValue(dto.getValue());
        review.setPhotos(dto.getPhotos());
        review.setReviewDate(dto.getReviewDate());
        return review;
    }

    public static ReviewDTO fromEntity (Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setText(review.getText());
        dto.setValue(review.getValue());
        dto.setPhotos(review.getPhotos());
        dto.setReviewDate(review.getReviewDate());
        return dto;
    }
}

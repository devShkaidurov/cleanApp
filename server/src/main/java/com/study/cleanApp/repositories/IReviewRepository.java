package com.study.cleanApp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Photo;
import com.study.cleanApp.models.Review;

public interface IReviewRepository extends JpaRepository<Review, Long> {

    List<Photo> findPhotoById(long reviewId);
    
}

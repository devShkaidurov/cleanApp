package com.study.cleanApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Review;

public interface IReviewRepository extends JpaRepository<Review, Long> {
    
}

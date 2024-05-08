package com.study.cleanApp.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.study.cleanApp.dto.ReviewDTO;
import com.study.cleanApp.models.Order;
import com.study.cleanApp.models.Photo;
import com.study.cleanApp.models.Review;
import com.study.cleanApp.repositories.IOrderRepository;
import com.study.cleanApp.repositories.IPhotoRepository;
import com.study.cleanApp.repositories.IReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final IReviewRepository reviewRepository;
    private final IPhotoRepository photoRepository;
    private final IOrderRepository orderRepository;

    public ReviewDTO addReview(long orderId, List<MultipartFile> photos, String text, double value) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty())
            return null;

        Review review = new Review();
        review.setText(text);
        review.setValue(value);
        Review savedReview = reviewRepository.save(review);
        List<Photo> savedPhotos = new ArrayList<>();
        for (MultipartFile photo : photos) {
            if (photo.isEmpty())
                continue;
            try {
                String uploadDir = "D:/university/cleanApp/server/photos";
                File uploadPath = new File(uploadDir);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }

                String filename = photo.getOriginalFilename();
                String filePath = uploadDir + File.separator + filename;
                File destFile = new File(filePath); // path to database
                photo.transferTo(destFile);

                // Create PHOTO entity
                Photo photoEntity = new Photo();
                photoEntity.setPath(filePath);
                photoEntity.setReview(review);
                Photo savedPhoto = photoRepository.save(photoEntity);
                savedPhotos.add(savedPhoto);
                List<Photo> photosReview = review.getPhotos();
                if (photosReview == null) {
                    photosReview = new ArrayList<>();
                }
                photosReview.add(savedPhoto);
                review.setPhotos(photosReview);
            } catch (IOException e) {
                continue;
            }
        }

        savedReview.setPhotos(savedPhotos);
        reviewRepository.save(review);
        // Взять сущность Order и проставить ему Review
        order.get().setReview(savedReview);
        orderRepository.save(order.get());

        return savedReview == null ? null : ReviewDTO.fromEntity(savedReview);
    }

    public ReviewDTO getReview(long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty())
            return null;
        Review review = order.get().getReview();
        return review == null ? null : ReviewDTO.fromEntity(review);
    }
}

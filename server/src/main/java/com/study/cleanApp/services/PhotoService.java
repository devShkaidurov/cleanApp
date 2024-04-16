package com.study.cleanApp.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.study.cleanApp.models.Photo;
import com.study.cleanApp.models.Review;
import com.study.cleanApp.repositories.IPhotoRepository;
import com.study.cleanApp.repositories.IReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final IPhotoRepository photoRepository;
    private final IReviewRepository reviewRepository;

    public List<byte[]> getPhotos (long reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isEmpty())
            return null;

        List<Photo> listPhoto = review.get().getPhotos();
        List<byte[]> photoBytes = new ArrayList<>();
        for (Photo photo : listPhoto) {
            File file;
            try {
                file = ResourceUtils.getFile(photo.getPath());
                Path path = file.toPath();
                photoBytes.add(Files.readAllBytes(path));
            } catch (IOException e) {
                e.printStackTrace();
            };
        }
        return photoBytes;
    }
}
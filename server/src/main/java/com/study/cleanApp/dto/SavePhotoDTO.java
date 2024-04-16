package com.study.cleanApp.dto;

import com.study.cleanApp.models.Photo;
import com.study.cleanApp.models.Review;

import lombok.Data;

@Data
public class SavePhotoDTO {
    private String path;
    private Review review;

    public static Photo toEntity (SavePhotoDTO dto) {
        Photo photo = new Photo();
        photo.setPath(dto.getPath());
        photo.setReview(dto.getReview());
        return photo;
    }

    public static SavePhotoDTO fromEntity (Photo photo) {
        SavePhotoDTO dto = new SavePhotoDTO();
        dto.setPath(photo.getPath());
        dto.setReview(photo.getReview());
        return dto;
    }
}

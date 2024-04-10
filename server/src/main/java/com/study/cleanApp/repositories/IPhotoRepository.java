package com.study.cleanApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Photo;

public interface IPhotoRepository extends JpaRepository<Photo, Long> {
    
}

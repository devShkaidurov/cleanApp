package com.study.cleanApp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Cleaner;

public interface ICleanerRepository extends JpaRepository<Cleaner, Long> {

    List<Cleaner> findAllByLoginAndPassword(String string, String hexString);
    
}

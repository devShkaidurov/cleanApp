package com.study.cleanApp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Cleaner;

public interface ICleanerRepository extends JpaRepository<Cleaner, Long> {

    List<Cleaner> findAllByLoginAndPassword(String string, String hexString);

    Optional<Cleaner> findById(long order_cleaner_id);
    
}

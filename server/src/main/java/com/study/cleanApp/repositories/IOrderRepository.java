package com.study.cleanApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.cleanApp.models.Order;

public interface IOrderRepository extends JpaRepository<Order, Long> {
    
}

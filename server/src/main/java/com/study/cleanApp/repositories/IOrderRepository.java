package com.study.cleanApp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.study.cleanApp.models.Customer;
import com.study.cleanApp.models.Order;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.customer = :customer AND o.status != 1")
    List<Order> findAllByCustomerAndNotStatus(Customer customer);
    List<Order> findAllByCustomerAndStatus(Customer customer, int i);
    
}

package com.study.cleanApp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.study.cleanApp.models.Customer;
import com.study.cleanApp.models.Order;
import com.study.cleanApp.models.Review;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.customer = :customer AND o.status != -1 AND o.status != -2")
    List<Order> findAllByCustomerAndNotStatus(Customer customer);
    @Query("SELECT o FROM Order o WHERE o.customer = :customer AND (o.status = -1 OR o.status = -2)")
    List<Order> findAllByCustomerAndStatus(Customer customer);
    Optional<Review> findReviewById(long orderId);
}

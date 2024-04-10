package com.study.cleanApp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.cleanApp.models.Customer;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Long> {
    
    public List<Customer> findAllByLoginAndPassword(String login,  String password);
}

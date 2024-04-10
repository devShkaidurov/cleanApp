package com.study.cleanApp.dto;

import java.util.List;

import com.study.cleanApp.models.Customer;
import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class CustomerDTO {
    private long id;
    private String name;
    private String login;
    private List<Order> orders;

    public static Customer toEntity (CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setLogin(dto.getLogin());
        customer.setOrders(dto.getOrders());
        return customer;
    }

    public static CustomerDTO fromEntity (Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setLogin(customer.getLogin());
        dto.setOrders(customer.getOrders());
        return dto;
    }
    
}

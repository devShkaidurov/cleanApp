package com.study.cleanApp.dto;

import com.study.cleanApp.models.Customer;

import lombok.Data;

@Data
public class CustomerUpdateDTO {
    private String name;
    private String login;
    private String password;

    public static Customer toEntity (CustomerUpdateDTO dto) {
        Customer customer = new Customer();
        customer.setName(dto.getName());
        customer.setLogin(dto.getLogin());
        customer.setName(dto.getName());
        return customer;
    }

    public static CustomerUpdateDTO fromEntity (Customer customer) {
        CustomerUpdateDTO dto = new CustomerUpdateDTO();
        dto.setName(customer.getName());
        dto.setLogin(customer.getLogin());
        dto.setName(customer.getName());
        return dto;
    }
}
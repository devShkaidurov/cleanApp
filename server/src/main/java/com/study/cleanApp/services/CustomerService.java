package com.study.cleanApp.services;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.study.cleanApp.dto.CustomerDTO;
import com.study.cleanApp.dto.CustomerUpdateDTO;
import com.study.cleanApp.dto.RegisterUser;
import com.study.cleanApp.models.Customer;
import com.study.cleanApp.repositories.ICustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final ICustomerRepository customerRepository;

    public CustomerDTO auth (Optional<String> login, Optional<String> pass) throws NoSuchAlgorithmException {
        if (login.isEmpty() || pass.isEmpty())
            return null;
        List<Customer> listCustomer = customerRepository.findAllByLoginAndPassword(login.get(), RegisterUser.toHexString(RegisterUser.getSHA(pass.get())));
        return listCustomer.size() == 0 ? null : CustomerDTO.fromEntity(listCustomer.get(0));
    }

    public CustomerDTO register (RegisterUser user) throws NoSuchAlgorithmException {
        Customer customer = RegisterUser.toCustomer(user);
        Customer registered = customerRepository.save(customer);
        return registered == null ? null : CustomerDTO.fromEntity(registered);
    }
    
    public CustomerDTO get (long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty())
            return null;
        return CustomerDTO.fromEntity(customer.get());
    }

    public CustomerDTO update (long id, CustomerUpdateDTO dto) throws NoSuchAlgorithmException {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty())
            return null;
        customer.get().setName(dto.getName());
        customer.get().setLogin(dto.getLogin());
        if (dto.getPassword() != null)
            customer.get().setPassword(RegisterUser.toHexString(RegisterUser.getSHA(dto.getPassword())));
        customerRepository.save(customer.get());
        return CustomerDTO.fromEntity(customer.get());
    }
}

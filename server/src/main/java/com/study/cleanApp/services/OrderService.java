package com.study.cleanApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.study.cleanApp.dto.MakeOrderDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.models.Cleaner;
import com.study.cleanApp.models.Customer;
import com.study.cleanApp.models.Order;
import com.study.cleanApp.repositories.ICleanerRepository;
import com.study.cleanApp.repositories.ICustomerRepository;
import com.study.cleanApp.repositories.IOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final IOrderRepository orderRepository;
    private final ICustomerRepository customerRepository;
    private final ICleanerRepository cleanerRepository;

    public List<OrderDTO> getActiveOrders (long userId) {
        Optional<Customer> customer = customerRepository.findById(userId);
        if (customer.isEmpty())
            return null;
        List<Order> orders = orderRepository.findAllByCustomerAndNotStatus(customer.get());
        if (orders.isEmpty())
            return null;
        return orders.stream()
            .map(OrderDTO::fromEntity)
            .toList();
    }

    public List<OrderDTO> getDoneOrders (long userId) {
        Optional<Customer> customer = customerRepository.findById(userId);
        if (customer.isEmpty())
            return null;
        List<Order> orders = orderRepository.findAllByCustomerAndStatus(customer.get(), -1);
        if (orders.isEmpty())
            return null;
        return orders.stream()
            .map(OrderDTO::fromEntity)
            .toList();
    }

    public OrderDTO makeOrder (long userId, MakeOrderDTO dto) {
        Optional<Customer> customer = customerRepository.findById(userId);
        Optional<Cleaner> cleaner = cleanerRepository.findById(dto.getOrder_cleaner_id());
        if (customer.isEmpty() || cleaner.isEmpty())
            return null;
        Order order = MakeOrderDTO.toEntity(dto);
        order.setCleaner(cleaner.get());
        order.setCustomer(customer.get());
        Order savedOrder = orderRepository.save(order);
        return savedOrder == null ? null : OrderDTO.fromEntity(savedOrder);
    }
}

package com.study.cleanApp.dto;

import java.util.Date;

import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class OrderDTO {
    private long id;
    private Date orderDate;
    private int price;
    private int status;
    private int square;
    private int cleanType;
    private int orderType;
    private String orderAddress;
    private boolean done; 

    public static OrderDTO fromEntity (Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setPrice(order.getPrice());
        dto.setStatus(order.getStatus());
        dto.setCleanType(order.getCleanType());
        dto.setOrderType(order.getOrderType());
        dto.setOrderAddress(order.getOrderAddress());
        dto.setDone(order.isDone());
        dto.setSquare(order.getSquare());
        return dto;
    }

    public static Order toEntity (OrderDTO dto) {
        Order order = new Order();
        order.setId(dto.getId());
        order.setOrderDate(dto.getOrderDate());
        order.setPrice(dto.getPrice());
        order.setStatus(dto.getStatus());
        order.setCleanType(dto.getCleanType());
        order.setOrderType(dto.getOrderType());
        order.setOrderAddress(dto.getOrderAddress());
        order.setDone(dto.isDone());
        order.setSquare(dto.getSquare());
        return order;
    }
}

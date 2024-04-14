package com.study.cleanApp.dto;

import java.util.Date;

import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class OrderDTO {
    private long id;
    private Date date;
    private int price;
    private int status;
    private int square;
    private int clean_type;
    private int order_type;
    private String order_address;
    private boolean is_done; 

    public static OrderDTO fromEntity (Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setDate(order.getOrderDate());
        dto.setPrice(order.getPrice());
        dto.setStatus(order.getStatus());
        dto.setClean_type(order.getCleanType());
        dto.setOrder_type(order.getOrderType());
        dto.setOrder_address(order.getOrderAddress());
        dto.set_done(order.isDone());
        dto.setSquare(order.getSquare());
        return dto;
    }

    public static Order toEntity (OrderDTO dto) {
        Order order = new Order();
        order.setId(dto.getId());
        order.setOrderDate(dto.getDate());
        order.setPrice(dto.getPrice());
        order.setStatus(dto.getStatus());
        order.setCleanType(dto.getClean_type());
        order.setOrderType(dto.getOrder_type());
        order.setOrderAddress(dto.getOrder_address());
        order.setDone(dto.is_done());
        order.setSquare(dto.getSquare());
        return order;
    }
}

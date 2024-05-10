package com.study.cleanApp.dto;

import java.util.Date;

import com.study.cleanApp.models.Order;

import lombok.Data;

@Data
public class MakeOrderDTO {
    private int order_type;
    private int clean_type;
    private int square;
    private String order_address;
    private Date date;
    private long order_cleaner_id;
    private int price;

    public static Order toEntity (MakeOrderDTO dto) {
        Order order = new Order();
        order.setCleanType(dto.getClean_type());
        order.setOrderType(dto.getOrder_type());
        order.setSquare(dto.getSquare());
        order.setOrderAddress(dto.getOrder_address());
        order.setOrderDate(dto.getDate());
        order.setPrice(dto.getPrice());
        return order;
    }
}

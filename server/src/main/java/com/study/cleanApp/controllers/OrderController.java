package com.study.cleanApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.cleanApp.dto.MakeOrderDTO;
import com.study.cleanApp.dto.OrderDTO;
import com.study.cleanApp.services.OrderService;

@CrossOrigin
@RestController
@RequestMapping("/{userId}/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/active")
    public ResponseEntity<?> getActiveOrders (@PathVariable("userId") long userId) {
        List<OrderDTO> orders = orderService.getActiveOrders(userId);
        return new ResponseEntity<>(orders, orders == null ? HttpStatus.NOT_FOUND : HttpStatus.OK); 
    }

    @GetMapping("/done")
    public ResponseEntity<?> getDoneOrders (@PathVariable("userId") long userId) {
        List<OrderDTO> orders = orderService.getDoneOrdersOrCanceled(userId);
        return new ResponseEntity<>(orders, orders == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> makeOrder (@PathVariable ("userId") long userId, @RequestBody MakeOrderDTO dto) {
        OrderDTO order = orderService.makeOrder(userId, dto);
        return new ResponseEntity<>(order, order == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder (@PathVariable ("orderId") long orderId) {
        OrderDTO order = orderService.cancelOrder(orderId);
        return new ResponseEntity<>(order, order == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById (@PathVariable("orderId") long id) {
        OrderDTO dto = orderService.getOrderById(id);
        return new ResponseEntity<>(dto, dto == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

}

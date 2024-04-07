package com.study.cleanApp.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "orders", schema = "public")
public class Order {
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    private Date orderDate;
    private int price;
    private int status;
    private String orderAddress;
    private boolean isDone;
    private int cleanType;
    private int orderType;

    @ManyToOne(fetch = FetchType.EAGER,
        cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id", foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonManagedReference
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER,
        cascade = CascadeType.MERGE)
    @JoinColumn(name = "cleaner_id", foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonManagedReference
    private Cleaner cleaner;

    
    @OneToOne(mappedBy = "post", 
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY, optional = false)
    private Review review;

}

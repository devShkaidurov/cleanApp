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
    private int square;

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

    
    @OneToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "fk_review_id")
    private Review review;

}

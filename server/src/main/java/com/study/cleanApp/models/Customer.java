package com.study.cleanApp.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "customers", schema = "public")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column
    private String login;

    @Column
    private String password;

    @Column
    private String name;

    @OneToMany(mappedBy = "customer",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Order> orders;    

}

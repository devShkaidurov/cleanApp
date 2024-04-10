package com.study.cleanApp.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "reviews", schema = "public")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private long id;
    private String text;
    private double value;
    private Date reviewDate;

    @OneToMany(mappedBy = "review")
    private List<Photo> photos;

    // @OneToOne(cascade = CascadeType.ALL) 
    // private Order order;
}
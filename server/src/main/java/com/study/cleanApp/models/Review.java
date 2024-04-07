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
    private long id;
    private String text;
    private double value;
    private Date reviewDate;

    @OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "post_id")3
    private Order order;

    @OneToMany(mappedBy = "review",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL)
    private List<Photo> photos;

}

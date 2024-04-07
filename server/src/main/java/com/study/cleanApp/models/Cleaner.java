package com.study.cleanApp.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "cleaners", schema = "public")
public class Cleaner {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column
    private String login;

    @Column
    private String password;

    @Column
    private String fio;

    @Column
    private Date birthdate;

    @OneToMany(mappedBy = "cleaner",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Order> orders;
}

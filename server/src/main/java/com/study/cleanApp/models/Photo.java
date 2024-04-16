package com.study.cleanApp.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "photos", schema = "public")
@Data
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String path;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "review_id", foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonBackReference
    private Review review;
}

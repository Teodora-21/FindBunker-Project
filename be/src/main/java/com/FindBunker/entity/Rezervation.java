package com.FindBunker.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name="rezervation")
@Data
public class Rezervation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="bunker_id")
    int bunker_id;
    @Column(name="refugee_id")
    int refugee_id;
    @Column(name="rezervation_start")
    LocalDate rezervation_start;
}
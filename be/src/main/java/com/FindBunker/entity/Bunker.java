package com.FindBunker.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="bunker")
@Data
public class Bunker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="name")
    String name;
    @Column(name="location")
    String location;
    @Column(name="max_capacity")
    int max_capacity;
    @Column(name="free_slots")
    int free_slots;
    @Column(name="utilities")
    String utilities;
    @Column(name="available")
    boolean available;
}

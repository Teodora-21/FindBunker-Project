package com.FindBunker.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="identity_id")
    String identityId;
    @Column(name="full_name")
    String fullName;
    @Column(name="email")
    String email;
    @Column(name="phone_number")
    String phone_number;
    @Column(name="address")
    String address;
    @Column(name="has_reservation")
    int has_reservation;
}
package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teacher")
public class Admin {
    
    @Id
    @Column(name = "id")
    @Getter @Setter
    private int id;

    @Column(name = "name", nullable = false, length = 50)
    @Getter @Setter
    private String name;

    @Column(name = "lastname", nullable = false, length = 50)
    @Getter @Setter
    private String lastName;

    @Column(name = "years", nullable = false)
    @Getter @Setter
    private int years;

    @Column(name = "email", nullable = false, length = 150, unique = true)
    @Getter @Setter
    private String email;

    @Column(name = "phone", nullable = false)
    @Getter @Setter
    private String phone;

    @Column(name = "password", nullable = false)
    @Getter @Setter
    private String password;
}


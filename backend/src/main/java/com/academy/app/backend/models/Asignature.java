package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "asignature")
public class Asignature {

    @Id
    @Column(name = "id")
    @GeneratedValue
    @Getter
    @Setter
    private int id;

    @Column(name = "name", nullable = false, length = 50, unique = true)
    @Getter
    @Setter
    private String name;

}

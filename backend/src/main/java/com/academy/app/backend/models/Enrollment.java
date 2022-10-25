package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "enrollment")
public class Enrollment {
    
    @Id
    @Column(name = "id")
    @GeneratedValue
    @Getter @Setter
    private int id;

    @Column (name = "idgroup", nullable = false)
    @Getter @Setter
    private int idGroup;

    @Column (name = "idstudent", nullable = false)
    @Getter @Setter
    private int idStudent;

    @Column (name = "countseen")
    @Getter @Setter
    private int countSeen;

    @Column(name = "idasignature", nullable = false)
    @Getter @Setter
    private int idAsignature;
}

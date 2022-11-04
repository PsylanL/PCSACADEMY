package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "classgroup")
public class ClassGroup {
    
    @Id
    @Column(name = "id")
    @GeneratedValue
    @Getter @Setter
    private int id;

    @Column(name = "idteacher", nullable = false)
    @Getter @Setter
    private int idTeacher;

    @Column(name = "idasignature", nullable = false)
    @Getter @Setter
    private int idAsignature;

    @Column(name = "schedule", nullable = false, length = 100)
    @Getter @Setter
    private String schedule;
}

package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @Column(name = "id")
    @GeneratedValue
    @Getter
    @Setter
    private int id;

    @Column(name = "idstudent", nullable = false)
    @Getter
    @Setter
    private int idStudent;

    @Column(name = "idasignature", nullable = false)
    @Getter
    @Setter
    private int idAsignature;

    @Column(name = "idteacher", nullable = false)
    @Getter
    @Setter
    private int idTeacher;

    
    @Column(name = "idcourse", nullable = false)
    @Getter
    @Setter
    private int idCourse;

    
    @Column(name = "grade", nullable = false)
    @Getter
    @Setter
    private float grade;
    
}

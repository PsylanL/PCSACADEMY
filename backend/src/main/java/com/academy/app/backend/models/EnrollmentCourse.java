package com.academy.app.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "enrollmentcourse")
public class EnrollmentCourse {
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

    @Column(name = "idcourse", nullable = false)
    @Getter
    @Setter
    private int idCourse;
}

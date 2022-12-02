package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Enrollment;

public interface EnrollmentDao {

    Boolean register(Enrollment enrollment);

    List<Object> schedule(int id);

    List<Object> list(int id);

    List<Enrollment> listAll();

    List<Object> listStudentsWithAsignatures();

    List<Object> listEvolution(int id);

    List<String> status(int idstudent);
    /* 
    boolean getStatusOF();
    */
}

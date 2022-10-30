package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Enrollment;

public interface EnrollmentDao {

    void register(Enrollment enrollment);

    List<Object> schedule(int id);

    List<Object> list(int id);
}

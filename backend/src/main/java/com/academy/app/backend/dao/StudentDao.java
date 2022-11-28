package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Student;

public interface StudentDao {
    
    String register(Student student);
	
	List<Student> list();

    Student getUserByCredentials(Student student, String password);

    List<Student> search(int id);

    void confirmRegister(Student student);

    Student validate(String email);
}

package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.ClassGroup;
import com.academy.app.backend.models.Student;

public interface StudentDao {
    
    String register(Student student);
	
	List<Student> list();

    List<Student> listStudentWithCourse();

    Student getUserByCredentials(Student student, String password);

    List<Student> search(int id);

    void confirmRegister(Student student);

    Student validate(String email);

    List<ClassGroup> getClassGroups(int id);
}

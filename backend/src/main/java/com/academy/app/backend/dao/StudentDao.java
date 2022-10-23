package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Student;

public interface StudentDao {
    
void register(Student student);
	
	List<Student> list();
}

package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Teacher;

public interface TeacherDao {
	
	void register(Teacher teacher);
	
	List<Teacher> list();
    
}

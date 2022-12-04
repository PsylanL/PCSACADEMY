package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.ClassGroup;
import com.academy.app.backend.models.Teacher;

public interface TeacherDao {
	
	void register(Teacher teacher);
	
	List<Teacher> list();

    Teacher getUserByCredentials(Teacher teacher, String password);

    List<Teacher> search(int id);

    List<ClassGroup> getClassGroups(int id);

    Teacher validate(String email);

    void send(String affair, String body, int idTeacher, int idStudent);
    
}

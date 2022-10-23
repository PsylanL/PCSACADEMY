package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.models.Teacher;
import com.academy.app.backend.dao.TeacherDao;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
	
	@Autowired
    TeacherDao teacherDao;
	
	//Metodo que se llama al ejecutar request desde front
    @PostMapping("/register")
    public void registerTeacher (@RequestBody Teacher teacher) {
        teacherDao.register(teacher);
    }
    
    //Metodo que se llama al ejecutar request desde front
    @GetMapping("/list")
    public List<Teacher> list(){
       return teacherDao.list();
    }

	

}

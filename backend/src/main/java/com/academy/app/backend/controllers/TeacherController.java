package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.models.Teacher;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import com.academy.app.backend.dao.TeacherDao;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
	
	@Autowired
    TeacherDao teacherDao;
	
	//Metodo que se llama al ejecutar request desde front
    @PostMapping("/register")
    public void registerTeacher (@RequestBody Teacher teacher) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		String hash = argon2.hash(1, 1024, 1, teacher.getPassword()); //Encriptación contraseña
		teacher.setPassword(hash);
        teacherDao.register(teacher);
    }
    
    //Metodo que se llama al ejecutar request desde front
    @GetMapping("/list")
    public List<Teacher> list(){
        return teacherDao.list();
    }

    @GetMapping("/search/{id}")
    public List<Teacher> search (@PathVariable int id){
        return teacherDao.search(id);
    }
}

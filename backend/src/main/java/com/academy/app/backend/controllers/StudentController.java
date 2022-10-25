package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.models.Student;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import com.academy.app.backend.dao.StudentDao;

@RestController
@RequestMapping("/api/student")
public class StudentController {

	@Autowired
    StudentDao studentDao;
	
	//Metodo que se llama al ejecutar request desde front
    @PostMapping("/register")
    public void registerStudent (@RequestBody Student student) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		String hash = argon2.hash(1, 1024, 1, student.getPassword()); //Encriptación contraseña
		student.setPassword(hash);
        studentDao.register(student);
    }
    
    //Metodo que se llama al ejecutar request desde front
    @GetMapping("/list")
    public List<Student> list(){
        return studentDao.list();
    }

    
}

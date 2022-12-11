package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.models.ClassGroup;
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
    public ResponseEntity<Teacher> registerStudent (@RequestBody Teacher teacher) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		String hash = argon2.hash(1, 1024, 1, teacher.getPassword()); //Encriptación contraseña
		teacher.setPassword(hash);
        String response = teacherDao.register(teacher);
        if(response == "fail") {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
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

    @GetMapping("/classgroup/{id}")
    public List<ClassGroup> getClassGroups (@PathVariable int id){
        return teacherDao.getClassGroups(id);
    }

    @PostMapping("/send/{affair}/{body}/{idTeacher}/{idStudent}")
    public void sendEmail (@PathVariable String affair, @PathVariable String body, @PathVariable int idTeacher, @PathVariable int idStudent) {
        teacherDao.send(affair, body, idTeacher, idStudent);
    }

    @PostMapping("/confirm")
    public void confirmRegister (@RequestBody Teacher teacher) {
        teacherDao.confirmRegister(teacher);
    }

    @PostMapping("qualify/{id}/{classgroup}/{option}")
    public void qualify(@PathVariable int id, @PathVariable int classgroup ,@PathVariable String option){
        teacherDao.qualify(id, classgroup, option);
    }
}

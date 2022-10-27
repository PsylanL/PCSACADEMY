package com.academy.app.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.dao.StudentDao;
import com.academy.app.backend.dao.TeacherDao;
import com.academy.app.backend.models.Student;
import com.academy.app.backend.utils.JWTUtil;

@RestController
@RequestMapping ("/api/auth")
public class AuthController {
    
    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/loginStudent")
    public String loginStudent (@RequestBody Student student) {
        Student studentVerified = studentDao.getUserByCredentials(student);
        if (studentVerified != null){
            return jwtUtil.create(String.valueOf(studentVerified.getId()), studentVerified.getEmail()) + ',' + studentVerified.getId();
        }
        return "fail";
    }

    public String loginTeacher (){
        return "ok";
    }
}

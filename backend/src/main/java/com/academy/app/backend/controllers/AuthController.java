package com.academy.app.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.dao.AdminDao;
import com.academy.app.backend.dao.StudentDao;
import com.academy.app.backend.dao.TeacherDao;
import com.academy.app.backend.models.Admin;
import com.academy.app.backend.models.Student;
import com.academy.app.backend.models.Teacher;
import com.academy.app.backend.utils.JWTUtil;

@RestController
@RequestMapping ("/api/auth")
public class AuthController {
    
    @Autowired
    private StudentDao studentDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping ("/login/{email}/{password}")
    public String login (@PathVariable String email, @PathVariable String password) {
        Student student = studentDao.validate(email);
        if (student == null){
            Teacher teacher = teacherDao.validate(email);
            if (teacher == null){
                Admin admin = adminDao.validate(email);
                if (admin == null ) {
                    return "fail";
                } else {
                    return loginAdmin(admin, password);
                }
            }else {
                return loginTeacher(teacher, password);
            }
        } else {
            return loginStudent(student, password);
        }
    }

    @PostMapping("/loginStudent")
    public String loginStudent (@RequestBody Student student, String password) {
        Student studentVerified = studentDao.getUserByCredentials(student, password);
        if (studentVerified != null){
            return jwtUtil.create(String.valueOf(studentVerified.getId()), studentVerified.getEmail()) + "," + studentVerified.getId()+ "," + "student";
        }
        return "fail";
    }

    @PostMapping("/loginteacher")
    public String loginTeacher (@RequestBody Teacher teacher, String password){
        Teacher teacherVerified = teacherDao.getUserByCredentials(teacher, password);
        if (teacherVerified != null){
            return jwtUtil.create(String.valueOf(teacherVerified.getId()), teacherVerified.getEmail()) + ',' + teacherVerified.getId()+ "," + "teacher";
        }
        return "fail";
    }

    @PostMapping("/loginadmin")
    public String loginAdmin (@RequestBody Admin admin, String password){
        Admin adminVerified =  adminDao.getUserByCredentials(admin, password);
        if (adminVerified != null){
            return jwtUtil.create(String.valueOf(adminVerified.getId()), adminVerified.getEmail()) + ',' + adminVerified.getId()+ "," + "admin";
        }
        return "fail";
    }
}

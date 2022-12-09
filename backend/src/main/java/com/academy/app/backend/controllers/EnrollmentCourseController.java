package com.academy.app.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.dao.EnrollmentCourseDao;
import com.academy.app.backend.models.Course;
import com.academy.app.backend.models.EnrollmentCourse;
import com.academy.app.backend.utils.JWTUtil;

@RestController
@RequestMapping("/api/course")
public class EnrollmentCourseController {
	
	@Autowired
    EnrollmentCourseDao enrollmentCourseDao;

    @Autowired
    private JWTUtil jwtUtil;

    
    //Metodo que se llama al ejecutar request desde front
    @GetMapping("/list/{id}")
    public List<Object> list(@PathVariable int id, @RequestHeader(value = "authorization") String token) {
        int idStudent = Integer.parseInt(jwtUtil.getKey(token));
        if (idStudent == id) {
            return enrollmentCourseDao.list(id);
        }
        return new ArrayList<>();
    }

    @GetMapping("/listcourse")
    public List<Course> list() {       
            return enrollmentCourseDao.listCourse();
    }
	
    @PostMapping("/register")
    public void registerEnrollmentCourse (@RequestBody EnrollmentCourse enrollmentCourse){
        enrollmentCourseDao.register(enrollmentCourse);
    }

}


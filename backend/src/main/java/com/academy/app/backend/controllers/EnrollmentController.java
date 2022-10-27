package com.academy.app.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.models.Enrollment;
import com.academy.app.backend.utils.JWTUtil;
import com.academy.app.backend.dao.EnrollmentDao;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    @Autowired
    EnrollmentDao enrollmentDao;

    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/schedule/{id}")
    public List<Object> schedule(@PathVariable int id, @RequestHeader(value = "authorization") String token) {
        int idStudent = Integer.parseInt(jwtUtil.getKey(token));
        if(idStudent == id){
            return enrollmentDao.schedule(id);
        }
        return new ArrayList<>();
    }

}

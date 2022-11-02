package com.academy.app.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // Metodo que se llama al ejecutar request desde front
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Enrollment enrollment) {

        if (enrollmentDao.register(enrollment)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else

        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/schedule/{id}")
    public List<Object> schedule(@PathVariable int id, @RequestHeader(value = "authorization") String token) {
        int idStudent = Integer.parseInt(jwtUtil.getKey(token));
        if (idStudent == id) {
            return enrollmentDao.schedule(id);
        }
        return new ArrayList<>();
    }

    @GetMapping("/list/{id}")
    public List<Object> listar(@PathVariable int id, @RequestHeader(value = "authorization") String token) {
        int idStudent = Integer.parseInt(jwtUtil.getKey(token));
        if (idStudent == id) {
            return enrollmentDao.list(id);
        }
        return new ArrayList<>();
    }
}

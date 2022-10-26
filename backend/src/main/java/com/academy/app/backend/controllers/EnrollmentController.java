package com.academy.app.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.models.Enrollment;
import com.academy.app.backend.dao.EnrollmentDao;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    @Autowired
    EnrollmentDao enrollmentDao;

    @GetMapping("/schedule/{id}")
    public List<Enrollment> schedule(@PathVariable String id) {

        return enrollmentDao.schedule(id);
    }

}

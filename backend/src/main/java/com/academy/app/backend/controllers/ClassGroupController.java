package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.academy.app.backend.dao.ClassGroupDao;
import com.academy.app.backend.models.ClassGroup;

@RestController
@RequestMapping("/api/classgroup")
public class ClassGroupController {

    @Autowired
    ClassGroupDao classGroupDao;

    @GetMapping("/list/{id}")
    public List<ClassGroup> listar(@PathVariable int id) {
        return classGroupDao.listSearch(id);
    }
}

package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/getasignature/{id}")
    public String getAsignature (@PathVariable int id) {
        return classGroupDao.getAsignature (id);
    }

    @GetMapping("/listTeachersWithAsignatures")
    public List<Object> listT () {
        return classGroupDao.listTeachersWithAsignatures();
    }

    @GetMapping("/getStudents/{id}")
    public List<Object> getStudents (@PathVariable int id){
        return classGroupDao.getStudents(id);
    }

    @PostMapping("/register")
    public void registerAsignatureTeacher (@RequestBody ClassGroup classGroup){
        classGroupDao.register(classGroup);
    }

    @GetMapping("/get/{id}")
    public ClassGroup getClassgGroup (@PathVariable int id) {
        return classGroupDao.getClassgGroup(id);
    }

    @PostMapping("/merge")
    public void merge (@RequestBody ClassGroup classGroup) {
        classGroupDao.merge(classGroup);
    }
}

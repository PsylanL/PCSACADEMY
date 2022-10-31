package com.academy.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.models.Asignature;
import com.academy.app.backend.dao.AsignatureDao;

@RestController
@RequestMapping("/api/asignature")
public class AsignatureController {

    @Autowired
    AsignatureDao asignatureDao;

    // Metodo que se llama al ejecutar request desde front
    @PostMapping("/register")
    public void registerAsignature(@RequestBody Asignature asignature) {
        asignatureDao.register(asignature);
    }

    // Metodo que se llama al ejecutar request desde front
    @GetMapping("/list")
    public List<Asignature> list() {
        return asignatureDao.list();
    }
}

package com.academy.app.backend.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academy.app.backend.models.Admin;

import com.academy.app.backend.dao.AdminDao;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
    AdminDao adminDao;
	
    
    //Metodo que se llama al ejecutar request desde front
    @GetMapping("/list")
    public List<Admin> list(){
        return adminDao.list();
    }

    @GetMapping("/search/{id}")
    public List<Admin> search (@PathVariable int id){
        return adminDao.search(id);
    }

}
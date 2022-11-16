package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Admin;

public interface AdminDao {
	
	void register(Admin admin);
	
	List<Admin> list();

    
}
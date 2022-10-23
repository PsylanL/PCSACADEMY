package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Asignature;

public interface AsignatureDao {
    
	void register(Asignature asignature);
	
	List<Asignature> list();
}

package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.Admin;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class AdminDaoImp implements AdminDao {
    //Variable para ejecutar consultas en la base de datos
    @PersistenceContext
	private EntityManager entityManager;

	//Metodo para listar los profesores
    @SuppressWarnings("unchecked")
	@Override
	public List<Admin> list() {
		String query = "from Teacher";
		return entityManager.createQuery(query).getResultList();
	}

    @Override
    public void register(Admin admin) {
        // TODO Auto-generated method stub
        
    }
}

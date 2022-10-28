package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Asignature;

@Transactional
@Repository
public class AsignatureDaoImp implements AsignatureDao {

	//Variable para consultas en la base de datos
	EntityManager entityManager;
	
	//Metodo para registrar una asignatura
	@Override
	public void register(Asignature asignature) {
		entityManager.merge(asignature);
	}
	
	//Metodo para listar todas las asignaturas
    @SuppressWarnings("unchecked")
	@Override
	public List<Asignature> list() {
    	String query ="from asignature";
    	return entityManager.createQuery(query).getResultList();
	}

}

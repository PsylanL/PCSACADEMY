package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Teacher;

@Transactional
@Repository
public class TeacherDaoImp implements TeacherDao {

	 //Variable para ejecutar consultas en la base de datos
    @PersistenceContext
	private EntityManager entityManager;

    //Metodo para registrar
	@Override
	public void register(Teacher teacher) {
		entityManager.merge(teacher);
	}
	
	//Metodo para listar los profesores
    @SuppressWarnings("unchecked")
	@Override
	public List<Teacher> list() {
		String query = "from teacher";
		return entityManager.createQuery(query).getResultList();
	}

}

package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Student;

@Transactional
@Repository
public class StudentDaoImp implements StudentDao {

	//Variable para ejecutar consultas en la base de datos
	@PersistenceContext
	private EntityManager entityManager;
	@Override
	
	//Metodo para registrar
	public void register(Student student) {
		entityManager.merge(student);
	}

	//Metodo para listar los estudiantes
    @SuppressWarnings("unchecked")
	@Override
	public List<Student> list() {
		String query = "from student";
		return entityManager.createQuery(query).getResultList();
	}

}

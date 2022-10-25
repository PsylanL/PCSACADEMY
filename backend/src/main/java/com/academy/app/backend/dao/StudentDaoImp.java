package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Student;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class StudentDaoImp implements StudentDao {

	// Variable para ejecutar consultas en la base de datos
	@PersistenceContext
	private EntityManager entityManager;

	@Override

	// Metodo para registrar
	public void register(Student student) {
		entityManager.merge(student);
	}

	// Metodo para listar los estudiantes
	@SuppressWarnings("unchecked")
	@Override
	public List<Student> list() {
		String query = "from Student";
		return entityManager.createQuery(query).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Student getUserByCredentials(Student student) {
		String query = "From Student Where email = :email";
		List<Student> lista = entityManager.createQuery(query)
				.setParameter("email", student.getEmail())
				.getResultList();
		if (lista.isEmpty()) {
			return null;
		}

		Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		if (argon2.verify(lista.get(0).getPassword(), student.getPassword())) {
			return lista.get(0);
		}
		return null;
	}

}

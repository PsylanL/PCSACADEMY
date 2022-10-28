package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Student;
import com.academy.app.backend.utils.EmailSenderService;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class StudentDaoImp implements StudentDao {

	// Variable para ejecutar consultas en la base de datos
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private EmailSenderService emailSenderService;

	@Override

	// Metodo para registrar
	public void register(Student student) {
		entityManager.persist(student);
		emailSenderService.sendEmail(student.getEmail(), "Welcome to our conduction academy", "Hi!, " + student.getName() + " We are excited that you are in our academy and we hope you to drive like a proffesional");
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

	@SuppressWarnings("unchecked")
	@Override
	public List<Student> search(int id) {
		String query = "from Student where id = " + id;
		return entityManager.createQuery(query).getResultList();
	}
}

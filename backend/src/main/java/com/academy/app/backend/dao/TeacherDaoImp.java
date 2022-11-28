package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.ClassGroup;
import com.academy.app.backend.models.Teacher;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class TeacherDaoImp implements TeacherDao {

	 //Variable para ejecutar consultas en la base de datos
    @PersistenceContext
	private EntityManager entityManager;

    //Metodo para registrar
	@Override
	public void register(Teacher teacher) {
		entityManager.persist(teacher);
	}
	
	//Metodo para listar los profesores
    @SuppressWarnings("unchecked")
	@Override
	public List<Teacher> list() {
		String query = "from Teacher";
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public Teacher getUserByCredentials(Teacher teacher, String password) {

		Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		if (argon2.verify(teacher.getPassword(), password)) {
			return teacher;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Teacher> search(int id) {
		String query = "from Teacher where id = " + id;
		return entityManager.createQuery(query).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClassGroup> getClassGroups(int id) {
		String query = "from ClassGroup where idteacher = " + id;
		return entityManager.createQuery(query).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Teacher validate(String email) {
		String query = "from Teacher where email = '" + email + "'";
		List<Teacher> teachers = entityManager.createQuery(query).getResultList();
		if (teachers.size() == 0){
			return null;
		}
		return teachers.get(0);
	}

}

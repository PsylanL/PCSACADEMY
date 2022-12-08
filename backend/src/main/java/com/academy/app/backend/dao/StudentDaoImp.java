package com.academy.app.backend.dao;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.Admin;
import com.academy.app.backend.models.ClassGroup;
import com.academy.app.backend.models.Student;
import com.academy.app.backend.models.Teacher;
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
	@SuppressWarnings("unchecked")
	public String register(Student student) {
		List<Teacher> teacher = new ArrayList<>();
		List<Admin> admin = new ArrayList<>();
		String queryTeacher = "from Teacher where email = '" + student.getEmail()+"'";
		String queryAdmin = "from Admin where email = '" + student.getEmail()+"'";

		admin = entityManager.createQuery(queryAdmin).getResultList();
		if(admin.size() == 0) {
			teacher = entityManager.createQuery(queryTeacher).getResultList();
			if (teacher.size() == 0) {
				entityManager.persist(student);
				return "ok";
			}
		}
		return "fail";
	}

	@Override
	public void confirmRegister(Student student) {
		emailSenderService.sendEmail(student.getEmail(), "Welcome to our conduction academy", "Hi!, " + student.getName() + " We are excited that you are in our academy and we hope you to drive like a proffesional");
	}

	// Metodo para listar los estudiantes
	@SuppressWarnings("unchecked")
	@Override
	public List<Student> list() {
		String query = "from Student";
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public Student getUserByCredentials(Student student, String password) {

		Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		if (argon2.verify(student.getPassword(),password)) {
			return student;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Student> search(int id) {
		String query = "from Student where id = " + id;
		return entityManager.createQuery(query).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Student validate(String email) {
		String query = "from Student where email = '" + email + "'";
		List<Student> students = entityManager.createQuery(query).getResultList();
		if (students.size() == 0){
			return null;
		}
		return students.get(0);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Student> listStudentWithCourse() {
		String query = "select s.* from enrollmentcourse e inner join student s on e.idstudent = s.id ";
		return entityManager.createNativeQuery(query).getResultList();
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ClassGroup> getClassGroups(int id) {
		List<ClassGroup> listClass = new ArrayList<ClassGroup>();
		String query1 = "select idgroup from enrollment where idstudent = " + id;
		List<Integer> result1 = entityManager.createNativeQuery(query1).getResultList();

		for (Integer element : result1) {
			String query2 = "from ClassGroup where id = " + element;
			listClass.add((ClassGroup) entityManager.createQuery(query2).getSingleResult());
		}
		return listClass;
	}

	
}

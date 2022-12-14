package com.academy.app.backend.dao;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.persister.walking.spi.EntityIdentifierDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.Admin;
import com.academy.app.backend.models.ClassGroup;
import com.academy.app.backend.models.Enrollment;
import com.academy.app.backend.models.Student;
import com.academy.app.backend.models.Teacher;
import com.academy.app.backend.utils.EmailSenderService;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class TeacherDaoImp implements TeacherDao {

	 //Variable para ejecutar consultas en la base de datos
    @PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private EmailSenderService emailSenderService;

    //Metodo para registrar
	@Override
	public String register(Teacher teacher) {
		List<Student> student = new ArrayList<>();
		List<Admin> admin = new ArrayList<>();
		List<Teacher> teac = new ArrayList<>();
		String queryStudent = "from Student where email = '" + teacher.getEmail()+"'";
		String queryAdmin = "from Admin where email = '" + teacher.getEmail()+"'";
		String queryTeacher = "from Teacher where email = '"+teacher.getEmail()+"'";

		admin = entityManager.createQuery(queryAdmin).getResultList();
		if(admin.size() == 0) {
			student = entityManager.createQuery(queryStudent).getResultList();
			if (student.size() == 0) {
				teac = entityManager.createQuery(queryTeacher).getResultList();
				if(teac.size() == 0){
					entityManager.persist(teacher);
					return "ok";
				}
				
			}
		}
		return "fail";

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

	@Override
	public void send(String affair, String body, int idTeacher, int idStudent) {
		Teacher teacher = entityManager.find(Teacher.class, idTeacher);
		Student Student = entityManager.find(Student.class, idStudent);
		affair += " from teacher " + teacher.getName();
		emailSenderService.sendEmail(Student.getEmail(), affair, body);
	}

	@Override
	public void confirmRegister(Teacher teacher) {
		emailSenderService.sendEmail(teacher.getEmail(), "Welcome to our conduction academy", "Hi!, " + teacher.getName() + " We are glad you are part of our team, thank you for helping us grow");
	}


	@Override
	public void qualify(int idStudent, int classgroup, String option) {
		String query = "from Enrollment where idStudent = " +idStudent + " AND idclassgroup = " + classgroup;
		Enrollment enrollment = (Enrollment) entityManager.createQuery(query).getSingleResult();
		enrollment.setStatus(option);
		entityManager.merge(enrollment);
	}

}

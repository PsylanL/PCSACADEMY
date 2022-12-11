package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.Enrollment;

@Transactional
@Repository
public class EnrollmentDaoImp implements EnrollmentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked") // Suprime las advertencias sobre operaciones genericas no verificadas
    @Override
    public List<Object> schedule(int id) {
        String sqlQuery = "select idclassgroup, a.name as asignatureName, s.name as teacherName, c.schedule " +
                "from Enrollment e inner join Asignature a on e.idasignature = a.id inner join classgroup c on c.id = e.idclassgroup inner join Teacher s on s.id = c.idteacher "
                +
                "where e.idstudent =" + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> list(int id) {
        String sqlQuery = "select e.id, idclassgroup, countseen, idasignature, a.name as asignatureName " +
                "from Enrollment e inner join Asignature a on e.idasignature = a.id "
                +
                "where e.idstudent =" + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

    @Override
    public Boolean register(Enrollment enrollment) {

        if(enrollment.getCountSeen() == 1)
        {
        String query = "from Enrollment where idAsignature= " + enrollment.getIdAsignature()
                + " and idStudent = " + enrollment.getIdStudent();
        Enrollment en = (Enrollment) entityManager.createQuery(query).getSingleResult();
        if(en.getCountSeen() < 2){
            en.setCountSeen(en.getCountSeen() + 1);
            en.setStatus(enrollment.getStatus());
            entityManager.merge(en);
            return true;
        }
        }
        else{
            enrollment.setCountSeen(1);
            entityManager.persist(enrollment);
            return true;
        } 
        return false;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> listEvolution(int id) {
        String sqlQuery = "select c.name as courseName,a.name as asignatureName, e.status " +
                "from Enrollment e inner join Asignature a on e.idasignature = a.id "+
                "inner join Course c on a.course = c.id " +
                "where e.idstudent = " + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<String> status(int idstudent){
        String query = "select status from Enrollment where idstudent=" + idstudent;
        return entityManager.createNativeQuery(query).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> listStudentsWithAsignatures() {
        String sqlQuery = "select s.id, s.name, s.lastname, s.email, s.phone, a.name as nameAsignature, c.schedule, e.status " + 
		"from Enrollment e inner join ClassGroup c on e.idclassgroup = c.id " + 
		"inner join Asignature a on c.idasignature = a.id " +
        "inner join Student s on e.idstudent = s.id " +
		"where e.idstudent = s.id ";

        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Enrollment> listAll() {
        String query = "From Enrollment";
		return entityManager.createQuery(query).getResultList();
    }
}

package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.ClassGroup;

@Transactional
@Repository
public class ClassGroupDaoImp implements ClassGroupDao {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<ClassGroup> listSearch(int id) {
        String query = "from ClassGroup Where idasignature = " + id;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public String getAsignature(int id) {
        String query = "SELECT name FROM classgroup INNER JOIN asignature on asignature.id = classgroup.idasignature where classgroup.id = " + id;
        return (String) entityManager.createNativeQuery(query).getSingleResult();
    }

    

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> listTeachersWithAsignatures() {
        String sqlQuery = "select t.id, t.name, t.lastname, t.email, t.phone, a.name as asignatureName, c.schedule, c.id as idClassgroup " + 
		"from ClassGroup c inner join Teacher t on c.idteacher = t.id " + 
		"inner join Asignature a on c.idasignature = a.id " +
		"where c.idteacher = t.id ";

        
		return entityManager.createNativeQuery(sqlQuery).getResultList();
    }


    @SuppressWarnings("unchecked")
    @Override
    public List<Object> getStudents(int id) {
        String query =  "SELECT s.id, s.name, e.status " +
                        "FROM enrollment e INNER join student s on s.id = e.idstudent INNER join classgroup c on c.id = e.idclassgroup " +
                        "where c.id = " + id;
        return entityManager.createNativeQuery(query).getResultList();
    }

    @Override
    public void register(ClassGroup classGroup) {
        entityManager.persist(classGroup);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> ListTeachersWithClassgroup(int id) {
        String sqlQuery = "select distinct t.name, t.lastname, t.id " +
                "from ClassGroup c inner join Teacher t on c.idteacher = t.id "+
                "where c.idasignature = " + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object> ClassgroupsAvailables(int id) {
        String sqlQuery = "select c.schedule, c.description, c.id " +
                "from ClassGroup c "+
                "where c.idteacher = " + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }


    @Override
    public ClassGroup getClassgGroup(int id) {
        return entityManager.find(ClassGroup.class, id);
    }

    @Override
    public void merge(ClassGroup classGroup) {
        entityManager.merge(classGroup);
    }
}

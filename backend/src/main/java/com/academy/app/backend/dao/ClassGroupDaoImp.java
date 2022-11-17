package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.ClassGroup;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

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
    public List<Object> getStudents(int id) {
        String query =  "SELECT s.id, s.name " +
                        "FROM enrollment e INNER join student s on s.id = e.idstudent INNER join classgroup c on c.id = e.idgroup " +
                        "where c.id = " + id;
        return entityManager.createNativeQuery(query).getResultList();
    }
}

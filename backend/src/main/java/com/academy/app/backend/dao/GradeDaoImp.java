package com.academy.app.backend.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class GradeDaoImp implements GradeDao {
    
    @PersistenceContext
	private EntityManager entityManager;


    @Override
    public List<Object> grad(int id) {
        String query = "from Grade where idStudent = " + id;
        return  entityManager.createQuery(query).getResultList();
    }

    
}

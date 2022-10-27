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
        String query = "from Enrollment e inner join Asignature a on e.idasignature = a.id Where idstudent = " + id;
        // String query = "from Enrollment Where idstudent = " + id;
        return entityManager.createQuery(query).getResultList();
    }

}

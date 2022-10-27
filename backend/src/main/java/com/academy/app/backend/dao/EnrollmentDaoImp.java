package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class EnrollmentDaoImp implements EnrollmentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked") // Suprime las advertencias sobre operaciones genericas no verificadas
    @Override
    public List<Object> schedule(int id) {
        //String query = "from Enrollment Where idstudent = " + id;
        String sqlQuery = "select idgroup, a.name as asignatureName, s.name as teacherName, c.schedule "+
                        "from Enrollment e inner join Asignature a on e.idasignature = a.id inner join classgroup c on c.id = e.idgroup inner join Teacher s on s.id = c.idteacher "+
                        "where e.idstudent =" + id;
        return entityManager.createNativeQuery(sqlQuery).getResultList();
    }

}

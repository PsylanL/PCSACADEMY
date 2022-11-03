package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.academy.app.backend.models.EnrollmentCourse;


@Transactional
@Repository
public class EnrollmentCourseDaoImp implements EnrollmentCourseDao{

    @PersistenceContext
	private EntityManager entityManager;

    @SuppressWarnings("unchecked")
	@Override
	public List<Object> list(int id) {
		String sqlQuery = "select * from EnrollmentCourse Where idstudent =" + id;
		return entityManager.createNativeQuery(sqlQuery).getResultList();
	}

    
}

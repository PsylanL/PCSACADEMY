package com.academy.app.backend.dao;

import java.util.List;

import com.academy.app.backend.models.Course;
import com.academy.app.backend.models.EnrollmentCourse;


public interface EnrollmentCourseDao {

     List<Object> list(int id);

     List<Course> listCourse();

     void register(EnrollmentCourse enrollmentCourse);

}

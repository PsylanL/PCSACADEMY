package com.academy.app.backend.dao;

import java.util.List;
import com.academy.app.backend.models.ClassGroup;

public interface ClassGroupDao {

    List<ClassGroup> listSearch(int id);

    String getAsignature(int id);

    List<Object> listTeachersWithAsignatures();

    List<Object> getStudents(int id);

    void register(ClassGroup classGroup);

    List <Object> ListTeachersWithClassgroup(int id);

    List <Object> ClassgroupsAvailables(int id);


    ClassGroup getClassgGroup(int id);

    void merge(ClassGroup classGroup);

}

package com.academy.app.backend.dao;

import java.util.List;
import com.academy.app.backend.models.ClassGroup;

public interface ClassGroupDao {

    List<ClassGroup> listSearch(int id);

}

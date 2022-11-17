package com.academy.app.backend.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

import com.academy.app.backend.models.Admin;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@Transactional
@Repository
public class AdminDaoImp implements AdminDao {
    //Variable para ejecutar consultas en la base de datos
    @PersistenceContext
	private EntityManager entityManager;

	//Metodo para listar los profesores
    @SuppressWarnings("unchecked")
	@Override
	public List<Admin> list() {
		String query = "From Admin";
		return entityManager.createQuery(query).getResultList();
	}

    @Override
    public void register(Admin admin) {
        // TODO Auto-generated method stub
        
    }

    @SuppressWarnings("unchecked")
    @Override
    public Admin getUserByCredentials(Admin admin) {
        String query = "From Admin Where email = :email";
		List<Admin> lista = entityManager.createQuery(query)
				.setParameter("email", admin.getEmail())
				.getResultList();
		if (lista.isEmpty()) {
			return null;
		}

		Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
		if (argon2.verify(lista.get(0).getPassword(), admin.getPassword())) {
			return lista.get(0);
		}
		//Admin v = lista.get(0);
		return null;
    }

	@SuppressWarnings("unchecked")
	@Override
	public List<Admin> search(int id) {
		String query = "from Admin where id = " + id;
		return entityManager.createQuery(query).getResultList();
	
	}

}

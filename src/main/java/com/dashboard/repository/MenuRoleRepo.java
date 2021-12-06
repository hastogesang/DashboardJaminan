package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.MenuRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MenuRoleRepo extends JpaRepository<MenuRole, Integer> {
    @Query(value = "SELECT * FROM Menu_Role WHERE role_id = ?1", nativeQuery = true)
    List<MenuRole> findByRoleId(Long id);
}

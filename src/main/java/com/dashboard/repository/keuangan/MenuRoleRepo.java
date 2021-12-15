package com.dashboard.repository.keuangan;

import java.util.List;

import com.dashboard.model.keuangan.MenuRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MenuRoleRepo extends JpaRepository<MenuRole, Integer> {
    @Query(value = "SELECT * FROM Menu_Role WHERE role_id = ?1", nativeQuery = true)
    List<MenuRole> findByRoleId(Integer id);

    @Query(value = "SELECT * FROM Menu_Role WHERE menu_id = ?1", nativeQuery = true)
    List<MenuRole> findByMenuId(Integer id);

    @Modifying
    @Transactional
    @Query("delete from MenuRole b where b.roleId=:id")
    void deleteByRoleId(@Param("id") Integer id);
}

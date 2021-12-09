package com.dashboard.repository.keuangan;

import java.util.List;

import com.dashboard.model.keuangan.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRoleRepo extends JpaRepository<UserRole, Integer>{
    List<UserRole> findByuserId(Integer userId);

    List<UserRole> findTop1000ByOrderByIdDesc();

    @Query(value = "DELETE FROM User_Role WHERE user_id = ?1", nativeQuery = true)
    void deleteByUserId(Integer id);
}

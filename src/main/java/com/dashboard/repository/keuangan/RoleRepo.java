package com.dashboard.repository.keuangan;
import java.util.Optional;

import com.dashboard.model.keuangan.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByRolename(String rolename);

    @Query("SELECT r FROM Role r WHERE r.rolename = :rolename")
    public Role getRoleByRolename(@Param("rolename") String rolename);
}

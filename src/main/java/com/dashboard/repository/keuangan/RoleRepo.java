package com.dashboard.repository.keuangan;
import java.util.Optional;

import com.dashboard.model.keuangan.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByRolename(String rolename);
}

package com.dashboard.repository.keuangan;

import java.util.List;

import javax.transaction.Transactional;

import com.dashboard.model.keuangan.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRoleRepo extends JpaRepository<UserRole, Integer>{
    List<UserRole> findByuserId(Integer userId);

    List<UserRole> findTop1000ByOrderByIdDesc();

    @Modifying
    @Transactional
    @Query("delete from UserRole b where b.userId=:id")
    void deleteByUserId(@Param("id") Integer id);

}

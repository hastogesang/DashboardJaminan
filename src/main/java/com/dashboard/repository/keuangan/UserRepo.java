package com.dashboard.repository.keuangan;

import java.util.List;

import com.dashboard.model.keuangan.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, Integer> {
    @Query(value = "SELECT TOP(1000) * FROM Users WHERE deleted != 'true' ORDER BY user_id DESC", nativeQuery = true)
    List<User> findTop1000ByOrderByIdDesc();

    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User getUserByUsername(@Param("username") String username);

}

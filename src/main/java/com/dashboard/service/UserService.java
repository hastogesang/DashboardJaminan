package com.dashboard.service;

import java.util.Arrays;

import com.dashboard.model.keuangan.Role;
import com.dashboard.model.keuangan.User;
import com.dashboard.repository.keuangan.RoleRepo;
import com.dashboard.repository.keuangan.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;

public class UserService {
    // @Autowired RoleRepo roleRepository;
    // public void saveUser(User user) {
    //     user.setPassword(passwordEncoders().encode(user.getPassword()));
    //     Role userRole = roleRepository.findByRole("ADMIN");
    //     user.setRole(new HashSet<Role>(Arrays.asList(userRole)));
    //     return userRepository.save(user);
    // }
}

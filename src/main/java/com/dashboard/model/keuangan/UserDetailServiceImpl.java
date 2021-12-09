package com.dashboard.model.keuangan;

import java.util.List;

import com.dashboard.repository.keuangan.UserRepo;
import com.dashboard.repository.keuangan.UserRoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserRoleRepo userRoleRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.getUserByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("could not find user");
        }

        List<UserRole> userRoles = userRoleRepo.findByuserId(user.getId());

        return new MyUserDetails(user, userRoles);
    }
    
}

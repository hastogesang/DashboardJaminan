package com.dashboard.service;

import java.util.ArrayList;
import java.util.List;

import com.dashboard.model.keuangan.MenuRole;
import com.dashboard.model.keuangan.Role;
import com.dashboard.model.keuangan.User;
import com.dashboard.model.keuangan.UserRole;
import com.dashboard.repository.keuangan.MenuRoleRepo;
import com.dashboard.repository.keuangan.UserRepo;
import com.dashboard.repository.keuangan.UserRoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HasAuthorityService {
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserRoleRepo userRoleRepo;
    
    @Autowired
    private MenuRoleRepo menuRoleRepo;

    public boolean hasAuthority(String username, String url){
        User user = userRepo.getUserByUsername(username);
        List<UserRole> userRoles = userRoleRepo.findByuserId(user.getId());
        Integer hasAuthority = 0;

        for (int i = 0; i < userRoles.size(); i++) {
            List<MenuRole> menuRoles = menuRoleRepo.findByRoleId(userRoles.get(i).getRoleId());
            for (int j = 0; j < menuRoles.size(); j++) {
                String menuUrl = menuRoles.get(j).getMenu().getUrl();
                // if(!menuUrl.contains("/"))
                    // menuUrl = "/" + menuUrl;
                if(url.contains(menuUrl)){
                    hasAuthority++;
                }
            }
        }

        if(hasAuthority > 0)
            return true;
        else
            return false;
    }
}
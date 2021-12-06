package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.Menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepo extends JpaRepository<Menu, Integer> {
    
    

}

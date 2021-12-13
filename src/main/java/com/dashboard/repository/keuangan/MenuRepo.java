package com.dashboard.repository.keuangan;

import java.util.List;

import com.dashboard.model.keuangan.Menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepo extends JpaRepository<Menu, Integer> {
    

}

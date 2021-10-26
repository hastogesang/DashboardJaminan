package com.dashboard.repository;

import com.dashboard.model.Mahasiswa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MahasiswaRepo extends JpaRepository<Mahasiswa, Long> {
    
}

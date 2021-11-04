package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.AnggotaKliring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnggotaKliringRepo extends JpaRepository<AnggotaKliring, Integer>{
    @Query("FROM AnggotaKliring WHERE id = ?1")
    List<AnggotaKliring> findAnggotaKliringById(Integer id);
}

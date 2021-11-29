package com.dashboard.repository;

import java.util.List;
import java.util.Optional;

import com.dashboard.model.AnggotaKliring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnggotaKliringRepo extends JpaRepository<AnggotaKliring, Integer>{
    List<AnggotaKliring> findTop1000ByOrderByIdDesc();

    @Query("FROM AnggotaKliring WHERE id = ?1")
    AnggotaKliring findAnggotaKliringById(Integer id);

    @Query(value = "SELECT 1 FROM AnggotaKliring WHERE code = ?1", nativeQuery = true)
    Optional<String> isCodeExist(String code);
}

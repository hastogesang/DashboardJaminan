package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.DanaCollateral;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DanaCollateralRepo extends JpaRepository<DanaCollateral, Long>{
    @Query("FROM DanaCollateral WHERE id = ?1")
    List<DanaCollateral> findDanaCollateralById(Long id);
}

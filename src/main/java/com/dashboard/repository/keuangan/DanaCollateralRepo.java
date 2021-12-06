package com.dashboard.repository.keuangan;

import java.util.Date;
import java.util.List;

import com.dashboard.model.keuangan.DanaCollateral;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DanaCollateralRepo extends JpaRepository<DanaCollateral, Integer>{
    List<DanaCollateral> findTop1000ByOrderByIdDesc();
    
    @Query("FROM DanaCollateral WHERE id = ?1")
    DanaCollateral findDanaCollateralById(Integer id);

    @Query("FROM DanaCollateral WHERE jatuhtempo = ?1 AND aro = 'T'")
    List<DanaCollateral> findDanaCollateralsByJatuhTempo(Date date);

    @Query("FROM DanaCollateral WHERE"
    + " (:bank IS NULL OR bank LIKE '%' + :bank + '%')"
    + " AND ((jatuhtempo BETWEEN :date1 AND :date2) OR :date1 IS NULL OR :date2 IS NULL)")
    List<DanaCollateral> GetFilteredDanaCollateral(@Param("bank") String bank, @Param("date1") Date date1, @Param("date2") Date date2, Sort sort);
}
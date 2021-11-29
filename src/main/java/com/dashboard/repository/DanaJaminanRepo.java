package com.dashboard.repository;

import java.util.Date;
import java.util.List;

import com.dashboard.model.DanaJaminan;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DanaJaminanRepo extends JpaRepository<DanaJaminan, Integer> {
    // @Query("select d from DanaJaminan d where d.id < 11")
    List<DanaJaminan> findTop1000ByOrderByIdDesc();

    @Query(value = "SELECT D FROM DanaJaminan D where D.jatuhtempo = ?1 and D.aro='T'")
    List<DanaJaminan> findByjatuhtempo(Date tanggal);

    @Query("FROM DanaJaminan WHERE"
    + " (:bank IS NULL OR bank LIKE '%' + :bank + '%')"
    + " AND ((jatuhtempo BETWEEN :date1 AND :date2) OR :date1 IS NULL OR :date2 IS NULL)")
    List<DanaJaminan> GetFilteredDanaJamninan(@Param("bank") String bank, @Param("date1") Date date1, @Param("date2") Date date2, Sort sort);
}

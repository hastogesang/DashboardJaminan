package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.GetDanaJaminanView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GetDanaJaminanViewRepo extends JpaRepository<GetDanaJaminanView, Integer> {
    @Query(value = " SELECT * FROM GetDanaJaminanView" + " WHERE jatuhtempo = ?1 and aro='T'", nativeQuery = true)
    List<GetDanaJaminanView> findByjatuhtempo(@Param("tanggal") String string);
}

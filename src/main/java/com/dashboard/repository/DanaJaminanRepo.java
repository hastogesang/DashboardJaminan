package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.DanaJaminan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DanaJaminanRepo extends JpaRepository<DanaJaminan, Integer> {
    @Query("from DanaJaminan where id < 11")
    List<DanaJaminan> GetDanaJaminan();
}

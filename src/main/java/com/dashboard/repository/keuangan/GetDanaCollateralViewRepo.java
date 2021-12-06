package com.dashboard.repository.keuangan;

import java.util.List;

import com.dashboard.model.keuangan.GetDanaCollateralView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GetDanaCollateralViewRepo extends JpaRepository<GetDanaCollateralView, Integer> {
    @Query(value = " SELECT * FROM GetDanaCollateralView WHERE jatuhtempo = ?1 and aro='T' ORDER BY id DESC", nativeQuery = true)
    List<GetDanaCollateralView> findDanaCollateralViewByjatuhtempo(String string);
}

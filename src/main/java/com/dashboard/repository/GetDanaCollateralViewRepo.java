package com.dashboard.repository;

import java.util.List;

import com.dashboard.model.GetDanaCollateralView;

import org.springframework.data.jpa.repository.Query;

public interface GetDanaCollateralViewRepo {
    @Query(value = " SELECT * FROM GetDanaCollateralView WHERE jatuhtempo = ?1 and aro='T' ORDER BY id DESC", nativeQuery = true)
    List<GetDanaCollateralView> findDanaCollateralViewByjatuhtempo(String string);
}

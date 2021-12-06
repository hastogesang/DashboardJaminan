package com.dashboard.repository.skd;

import java.util.List;

import com.dashboard.model.skd.ClearingMemberView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClearingMemberViewRepo extends JpaRepository<ClearingMemberView, Integer>{
    @Query(value = "SELECT TOP (1000) [CMID],[Code],[Name],[CMType] FROM [SKDTESTING].[SKD].[View_SKD_Danajamian] ORDER BY Code ASC", nativeQuery = true)
    List<ClearingMemberView> findCMView();
}

package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Integer> {
    @Query("SELECT buildingName FROM Building")
    List<String> findAllBuildingNames();

    Building findByBuildingName(String buildingName);
}

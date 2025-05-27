package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.dto.LocationFilterDetailsDTO;
import com.dba.poc.poc_dba2.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FloorRepository extends JpaRepository<Floor, Integer> {
    @Query("SELECT description FROM Floor")
    List<String> findAllFloorNames();

    @Query("SELECT new com.dba.poc.poc_dba2.dto.LocationFilterDetailsDTO(l.locationName, b.buildingName, f.description) FROM Floor f JOIN Building b ON f.building.buildingId = b.buildingId JOIN Location l ON b.location.locationId = l.locationId ")
    List<LocationFilterDetailsDTO> findLocationFilter();

    Floor findByDescription(String description);

    @Query("SELECT f.floorId FROM Floor f JOIN Building bu ON f.building.buildingId = bu.buildingId JOIN Location lo ON  bu.location.locationId = lo.locationId WHERE lo.locationName = :locationName AND bu.buildingName = :buildingName AND f.description = :description")
    Integer getFloorId(String locationName, String buildingName, String description);
}


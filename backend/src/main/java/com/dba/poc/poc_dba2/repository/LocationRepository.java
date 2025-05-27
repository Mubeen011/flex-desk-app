package com.dba.poc.poc_dba2.repository;

import com.dba.poc.poc_dba2.entity.Booking;
import com.dba.poc.poc_dba2.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    Location findByLocationName(String locationName);
}

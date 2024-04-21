package com.zosh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.model.FreeWorkshops;

public interface FreeWorkshopRepository extends JpaRepository<FreeWorkshops, Long>{

	public List<FreeWorkshops> findFreeWorkshopsByFestId(Long id);
}

package com.zosh.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.model.Fest;

public interface FestRepository extends JpaRepository<Fest, Long> {

	@Query("SELECT r FROM Fest r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.festCategory) LIKE lower(concat('%', :query, '%'))")
	List<Fest> findBySearchQuery(String query);

	Fest findByOwnerId(Long userId);



}

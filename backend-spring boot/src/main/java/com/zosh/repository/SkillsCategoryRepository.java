package com.zosh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.model.SkillCategory;

public interface SkillsCategoryRepository 
extends JpaRepository<SkillCategory, Long>{
	
	
//	List<SkillCategory> findByActivityId(Long menuItemId);
	List<SkillCategory> findByFestId(Long id);

	@Query("SELECT e FROM SkillCategory e "
			+ "WHERE e.fest.id = :festId "
			+ "AND lower(e.name) = lower(:name)")
	SkillCategory findByFestIdAndNameIgnoreCase(
			@Param("festId") Long festId, @Param("name") String name);
}

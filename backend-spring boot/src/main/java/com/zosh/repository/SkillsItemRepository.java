package com.zosh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.model.SkillCategory;
import com.zosh.model.SkillsItem;

public interface SkillsItemRepository extends JpaRepository<SkillsItem, Long> {

	
	List<SkillsItem> findByFestId(Long id);
	@Query("SELECT e FROM SkillsItem e "
			+ "WHERE e.fest.id = :festId "
			+ "AND lower(e.name) = lower(:name)"
			+ "AND e.category.name = :categoryName")
	public SkillsItem findByFestIdAndNameIngoreCase(
			@Param("festId") Long festId, 
			@Param("name") String name,
			@Param("categoryName") String categoryName);
}

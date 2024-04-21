package com.zosh.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.model.Category;
import com.zosh.model.Activity;

public interface activityRepository extends JpaRepository<Activity, Long> {

	
	List<Activity> findByFestId(Long festId);
	
	@Query("SELECT f FROM Activity f WHERE "
			+ "f.name LIKE %:keyword% OR "
			+ "f.activityCategory.name LIKE %:keyword% AND "
			+ "f.fest!=null"
	)
	List<Activity> searchByNameOrCategory(@Param("keyword") String keyword);


	

}

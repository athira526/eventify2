package com.zosh.service;

import java.util.List;

import com.zosh.Exception.ActivityException;
import com.zosh.Exception.FestException;
import com.zosh.model.SkillCategory;
import com.zosh.model.SkillsItem;
import com.zosh.model.Activity;
import com.zosh.repository.SkillsCategoryRepository;

public interface SkillsService {
	
	public SkillCategory createSkillsCategory(
			String name,Long festId) throws FestException;

	public SkillCategory findSkillsCategoryById(Long id) throws Exception;

	public List<SkillCategory> findSkillsCategoryByFestId(Long id) throws Exception;
	
	public List<SkillsItem> findFestsSkills(
			Long festId);

	
	public SkillsItem createSkillsItem(Long festId, 
			String skillName,Long skillCategoryId) throws Exception;

	public SkillsItem updateStoke(Long id) throws Exception;
	
}

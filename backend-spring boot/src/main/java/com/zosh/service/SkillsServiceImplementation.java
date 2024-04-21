package com.zosh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.Exception.ActivityException;
import com.zosh.Exception.FestException;
import com.zosh.model.SkillCategory;
import com.zosh.model.SkillsItem;
import com.zosh.model.Activity;
import com.zosh.model.Fest;
import com.zosh.repository.SkillsCategoryRepository;
import com.zosh.repository.SkillsItemRepository;

@Service
public class SkillsServiceImplementation implements SkillsService {

	@Autowired
	private SkillsCategoryRepository skillsCategoryRepo;
	
	@Autowired
	private SkillsItemRepository skillsItemRepository;
	
	
	
	@Autowired
	private FestService festService;
	
	@Override
	public SkillCategory createSkillsCategory(
			String name,Long festId) throws FestException {
		
		SkillCategory isExist=skillsCategoryRepo
				.findByFestIdAndNameIgnoreCase(festId,name);
		
		if(isExist!=null) {
			return isExist;
		}

		Fest fest=festService.findFestById(festId);
		
		SkillCategory skillCategory=new SkillCategory();
		skillCategory.setFest(fest);
		skillCategory.setName(name);
		
		SkillCategory createdCategory = skillsCategoryRepo.save(skillCategory);
		
		return createdCategory;
	}

	@Override
	public SkillCategory findSkillsCategoryById(Long id) throws Exception {
		Optional<SkillCategory> opt=skillsCategoryRepo.findById(id);
		if(opt.isEmpty()){
			throw new Exception("skill category not found");
		}
		return opt.get();
	}

	@Override
	public List<SkillCategory> findSkillsCategoryByFestId(Long id) throws Exception {
		return skillsCategoryRepo.findByFestId(id);
	}

	@Override
	public List<SkillsItem> findFestsSkills(Long festId) {

		return skillsItemRepository.findByFestId(festId);
	}
	

	@Override
	public SkillsItem createSkillsItem(Long festId, 
			String skillName, Long skillCategoryId) throws Exception {
		
		SkillCategory category = findSkillsCategoryById(skillCategoryId);
		
		SkillsItem isExist = skillsItemRepository.
				findByFestIdAndNameIngoreCase(festId, skillName,category.getName());
		if(isExist!=null) {
			System.out.println("is exists-------- item");
			return isExist;
		}
		
		Fest fest=festService.findFestById(
				festId);
		SkillsItem item=new SkillsItem();
		item.setName(skillName);
		item.setFest(fest);
		item.setCategory(category);
		
		SkillsItem savedSkills = skillsItemRepository.save(item);
		category.getSkills().add(savedSkills);

		return savedSkills;
	}


	@Override
	public SkillsItem updateStoke(Long id) throws Exception {
		Optional<SkillsItem> item=skillsItemRepository.findById(id);
		if(item.isEmpty()) {
			throw new Exception("skill not found with id "+item);
		}
		SkillsItem skill=item.get();
		skill.setInStoke(!skill.isInStoke());
		return skillsItemRepository.save(skill);
	}

	

	

}

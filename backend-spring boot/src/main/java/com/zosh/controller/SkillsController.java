package com.zosh.controller;

import java.util.List;

import com.zosh.request.CreateSkillCategoryRequest;
import com.zosh.request.CreateSkillRequest;
import com.zosh.request.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zosh.model.SkillCategory;
import com.zosh.model.SkillsItem;
import com.zosh.service.SkillsService;

@RestController
@RequestMapping("/api/admin/skills")
public class SkillsController {
	
	@Autowired
	private SkillsService skillService;

	@PostMapping("/category")
	public ResponseEntity<SkillCategory> createSkillCategory(
			@RequestBody CreateSkillCategoryRequest req) throws Exception{
		SkillCategory items=skillService.createSkillsCategory(req.getName(), req.getFestId());
		return new ResponseEntity<>(items,HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<SkillsItem> createSkill(
			@RequestBody CreateSkillRequest req) throws Exception{

		SkillsItem item=skillService.createSkillsItem(req.getFestId(),req.getName(),req.getSkillCategoryId());
		return new ResponseEntity<>(item,HttpStatus.OK);
	}
	
	@PutMapping("/{id}/stoke")
	public ResponseEntity<SkillsItem> updateStoke(@PathVariable Long id) throws Exception{
		SkillsItem item=skillService.updateStoke(id);
		return new ResponseEntity<SkillsItem>(item,HttpStatus.OK);
	}
	
	@GetMapping("/fest/{id}")
	public ResponseEntity<List<SkillsItem>> festsSkill(
			@PathVariable Long id) throws Exception{
		List<SkillsItem> items=skillService.findFestsSkills(id);
		return new ResponseEntity<>(items,HttpStatus.OK);
	}

	@GetMapping("/fest/{id}/category")
	public ResponseEntity<List<SkillCategory>> festsSkillCategory(
			@PathVariable Long id) throws Exception{
		List<SkillCategory> items=skillService.findSkillsCategoryByFestId(id);
		return new ResponseEntity<>(items,HttpStatus.OK);
	}

}

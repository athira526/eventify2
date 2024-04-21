package com.zosh.controller;

import java.util.List;

import com.zosh.Exception.UserException;
import com.zosh.model.User;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zosh.Exception.FestException;
import com.zosh.model.Category;
import com.zosh.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	public CategoryService categoryService;

	@Autowired
	public UserService userService;
	
	@PostMapping("/admin/category")
	public ResponseEntity<Category> createdCategory(
			@RequestHeader("Authorization")String jwt,
			@RequestBody Category category) throws FestException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		
		Category createdCategory=categoryService.createCategory(category.getName(), user.getId());
		return new ResponseEntity<Category>(createdCategory,HttpStatus.OK);
	}
	
	@GetMapping("/category/fest/{id}")
	public ResponseEntity<List<Category>> getFestsCategory(
			@PathVariable Long id,
			@RequestHeader("Authorization")String jwt) throws FestException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		List<Category> categories=categoryService.findCategoryByFestId(id);
		return new ResponseEntity<>(categories,HttpStatus.OK);
	}

}

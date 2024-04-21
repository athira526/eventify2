package com.zosh.controller;

import java.util.List;

import com.zosh.model.Category;
import com.zosh.model.Fest;
import com.zosh.service.CategoryService;
import com.zosh.service.FestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.Exception.ActivityException;
import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.model.Activity;
import com.zosh.model.User;
import com.zosh.request.CreateActivityRequest;
import com.zosh.service.ActivityService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/admin/activity")
public class AdminMenuItemController {
	
	@Autowired
	private ActivityService menuItemService;
	@Autowired
	private UserService userService;
	@Autowired
	private FestService festService;
	@Autowired
	private CategoryService categoryService;

	@PostMapping()
	public ResponseEntity<Activity> createItem(
			@RequestBody CreateActivityRequest item, 
			@RequestHeader("Authorization") String jwt)
			throws ActivityException, UserException, FestException {
		System.out.println("req-controller ----"+item);
		User user = userService.findUserProfileByJwt(jwt);
//		Category category=categoryService.findCategoryById(item.getCategoryId());
		Fest fest=festService.findFestById(item.getFestId());
			Activity menuItem = menuItemService.createActivity(item,item.getCategory(),fest);
			return ResponseEntity.ok(menuItem);

	}


	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws UserException, ActivityException {
		User user = userService.findUserProfileByJwt(jwt);
		
			menuItemService.deleteActivity(id);
			return ResponseEntity.ok("Menu item deleted");
		
	
	}

	

	@GetMapping("/search")
	public ResponseEntity<List<Activity>> getMenuItemByName(@RequestParam String name)  {
		List<Activity> menuItem = menuItemService.searchActivity(name);
		return ResponseEntity.ok(menuItem);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Activity> updateAvilibilityStatus(
			@PathVariable Long id) throws ActivityException {
		Activity menuItems= menuItemService.updateAvailibilityStatus(id);
		return ResponseEntity.ok(menuItems);
	}
	
	

}

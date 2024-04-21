package com.zosh.controller;

import java.util.List;

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
@RequestMapping("/api/activity")
public class MenuItemController {
	@Autowired
	private ActivityService menuItemService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/search")
	public ResponseEntity<List<Activity>> searchActivity(
			@RequestParam String name)  {
		List<Activity> menuItem = menuItemService.searchActivity(name);
		return ResponseEntity.ok(menuItem);
	}
	@GetMapping("/fest/{festId}")
	public ResponseEntity<List<Activity>> getMenuItemByFestId(
			@PathVariable Long festId,
			@RequestParam boolean offline,
			@RequestParam boolean groupevent,
			@RequestParam boolean nonveg,
			@RequestParam(required = false) String activity_category) throws ActivityException {
		List<Activity> menuItems= menuItemService.getFestsActivity(
				festId,offline,nonveg,groupevent,activity_category);
		return ResponseEntity.ok(menuItems);
	}
	


}

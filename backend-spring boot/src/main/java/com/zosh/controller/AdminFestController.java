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
import org.springframework.web.bind.annotation.RestController;

import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.request.CreateFestRequest;
import com.zosh.response.ApiResponse;
import com.zosh.service.FestService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/admin/fests")
public class AdminFestController {
	@Autowired
	private FestService festService;
	
	@Autowired
	private UserService userService;

	@PostMapping()
	public ResponseEntity<Fest> createFest(
			@RequestBody CreateFestRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException {

			User user = userService.findUserProfileByJwt(jwt);
		
			System.out.println("----TRUE___-----"+jwt);
			Fest fest = festService.createFest(req,user);
			return ResponseEntity.ok(fest);
	}


	@PutMapping("/{id}")
	public ResponseEntity<Fest> updateFest(@PathVariable Long id, @RequestBody CreateFestRequest req,
			@RequestHeader("Authorization") String jwt) throws FestException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			Fest fest = festService.updateFest(id, req);
			return ResponseEntity.ok(fest);
		
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteFestById(@PathVariable("id") Long festId,
			@RequestHeader("Authorization") String jwt) throws FestException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			festService.deleteFest(festId);
			
			ApiResponse res=new ApiResponse("Fest Deleted with id Successfully",true);
			return ResponseEntity.ok(res);
	}

	
	@PutMapping("/{id}/status")
	public ResponseEntity<Fest> updateStataurantStatus(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws FestException, UserException {
		
			Fest fest = festService.updateFestStatus(id);
			return ResponseEntity.ok(fest);

	}

	@GetMapping("/user")
	public ResponseEntity<Fest> findFestByUserId(
			@RequestHeader("Authorization") String jwt) throws FestException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Fest fest = festService.getFestsByUserId(user.getId());
		return ResponseEntity.ok(fest);

	}
	
	

}

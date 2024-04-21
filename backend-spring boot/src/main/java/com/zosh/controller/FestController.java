package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.dto.FestDto;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.service.FestService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/fests")
public class FestController {
	
	@Autowired
	private FestService festService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/search")
	public ResponseEntity<List<Fest>> findFestByName(
			@RequestParam String keyword) {
		List<Fest> fest = festService.searchFest(keyword);

		return ResponseEntity.ok(fest);
	}


	@GetMapping()
	public ResponseEntity<List<Fest>> getAllFests() {

		List<Fest> fests = festService.getAllFest();
		
		
		return ResponseEntity.ok(fests);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Fest> findFestById(
			@PathVariable Long id) throws FestException {

			Fest fest = festService.findFestById(id);
			return ResponseEntity.ok(fest);

	}
	
	@PutMapping("/{id}/add-favorites")
	public ResponseEntity<FestDto> addToFavorite(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws FestException, UserException {
		
			User user = userService.findUserProfileByJwt(jwt);
			FestDto fest = festService.addToFavorites(id, user);
			return ResponseEntity.ok(fest);

	}
	
	


}

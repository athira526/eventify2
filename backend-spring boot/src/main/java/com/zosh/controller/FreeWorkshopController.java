package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.Exception.FestException;
import com.zosh.model.FreeWorkshops;
import com.zosh.response.ApiResponse;
import com.zosh.service.FreeWorkshopsService;

@RestController
@RequestMapping("/api")
public class FreeWorkshopController {
	
	@Autowired
	public FreeWorkshopsService eventService;
	
	@PostMapping("/admin/events/fest/{festId}")
	public ResponseEntity<FreeWorkshops> createFreeWorkshops(@RequestBody FreeWorkshops event,
			@PathVariable Long festId) throws FestException{
		FreeWorkshops createdFreeWorkshops=eventService.createFreeWorkshop(event, festId);
		return new ResponseEntity<>(createdFreeWorkshops,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/events")
	public ResponseEntity<List<FreeWorkshops>> findAllFreeWorkshops() throws FestException{
		List<FreeWorkshops> events=eventService.findAllFreeWorkshop();
		return new ResponseEntity<>(events,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/admin/events/fest/{festId}")
	public ResponseEntity<List<FreeWorkshops>> findFestsFreeWorkshops(
			@PathVariable Long festId) throws FestException{
		List<FreeWorkshops> events=eventService.findFestsFreeWorkshop(festId);
		return new ResponseEntity<>(events,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/admin/events/{id}")
	public ResponseEntity<ApiResponse> deleteFreeWorkshops(
			@PathVariable Long id) throws Exception{
		eventService.deleteFreeWorkshop(id);
		ApiResponse res=new ApiResponse("FreeWorkshops Deleted",true);
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}

}

package com.zosh.service;

import java.util.List;

import com.zosh.Exception.FestException;
import com.zosh.dto.FestDto;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.request.CreateFestRequest;

public interface FestService {

	public Fest createFest(CreateFestRequest req,User user);

	public Fest updateFest(Long festId, CreateFestRequest updatedFest)
			throws FestException;

	public void deleteFest(Long festId) throws FestException;

	public List<Fest>getAllFest();

	public List<Fest>searchFest(String keyword);
	
	public Fest findFestById(Long id) throws FestException;

	public Fest getFestsByUserId(Long userId) throws FestException;
	
	public FestDto addToFavorites(Long festId,User user) throws FestException;

	public Fest updateFestStatus(Long id)throws FestException;
}

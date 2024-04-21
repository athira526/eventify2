package com.zosh.service;

import java.util.List;

import com.zosh.Exception.ActivityException;
import com.zosh.Exception.FestException;
import com.zosh.model.Category;
import com.zosh.model.Activity;
import com.zosh.model.Fest;
import com.zosh.request.CreateActivityRequest;

public interface ActivityService {

	public Activity createActivity(CreateActivityRequest req,Category category,
						   Fest fest) throws ActivityException, FestException;

	void deleteActivity(Long activityId) throws ActivityException;
	
	public List<Activity> getFestsActivity(Long festId,
			boolean isOffline, boolean isNonveg, boolean isGroupFreeWorkshop,String activityCategory) throws ActivityException;
	
	public List<Activity> searchActivity(String keyword);
	
	public Activity findActivityById(Long activityId) throws ActivityException;

	public Activity updateAvailibilityStatus(Long activityId) throws ActivityException;
}

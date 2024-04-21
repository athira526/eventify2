package com.zosh.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.Exception.ActivityException;
import com.zosh.Exception.FestException;
import com.zosh.model.Category;
import com.zosh.model.SkillsItem;
import com.zosh.model.Activity;
import com.zosh.model.Fest;
import com.zosh.repository.SkillsCategoryRepository;
import com.zosh.repository.activityRepository;
import com.zosh.repository.FestRepository;
import com.zosh.request.CreateActivityRequest;


@Service
public class ActivityServiceImplementation implements ActivityService {
	@Autowired
	private activityRepository activityRepository;
	

	
//	@Autowired
//	private FestRepository festRepository;


	
	@Autowired
	private SkillsService skillService;
	
	@Autowired
	private SkillsCategoryRepository skillCategoryRepo;

	@Override
	public Activity createActivity(CreateActivityRequest  req,
						   Category category,
						   Fest fest)
			throws ActivityException,
	FestException {

			Activity activity=new Activity();
			activity.setActivityCategory(category);
			activity.setCreationDate(new Date());
			activity.setDescription(req.getDescription());
			activity.setImages(req.getImages());
			activity.setName(req.getName());
			activity.setPrice((long) req.getPrice());
			activity.setGroupFreeWorkshop(req.isGroupevent());
			activity.setOffline(req.isOffline());
			activity.setSkills(req.getSkills());
		activity.setFest(fest);
			activity = activityRepository.save(activity);

			fest.getActivitys().add(activity);
			return activity;
		
	}

	@Override
	public void deleteActivity(Long activityId) throws ActivityException {
		Activity activity=findActivityById(activityId);
		activity.setFest(null);;
//		activityRepository.save(activity);
		activityRepository.delete(activity);

	}


	@Override
	public List<Activity> getFestsActivity(
			Long festId, 
			boolean isOffline, 
			boolean isNonveg,
			boolean isGroupFreeWorkshop,
			String activityCategory) throws ActivityException {
		List<Activity> activitys = activityRepository.findByFestId(festId);
		
		
		
	    if (isOffline) {
	        activitys = filterByOffline(activitys, isOffline);
	    }
	    if (isNonveg) {
	        activitys = filterByNonveg(activitys, isNonveg);
	    }

	    if (isGroupFreeWorkshop) {
	        activitys = filterByGroupEvent(activitys, isGroupFreeWorkshop);
	    }
	    if(activityCategory!=null && !activityCategory.equals("")) {
	    	activitys = filterByActivityCategory(activitys, activityCategory);
	    }
		
		return activitys;
		
	}
	
	private List<Activity> filterByOffline(List<Activity> activitys, boolean isOffline) {
	    return activitys.stream()
	            .filter(activity -> activity.isOffline() == isOffline)
	            .collect(Collectors.toList());
	}
	private List<Activity> filterByNonveg(List<Activity> activitys, boolean isNonveg) {
	    return activitys.stream()
	            .filter(activity -> activity.isOffline() == false)
	            .collect(Collectors.toList());
	}
	private List<Activity> filterByGroupEvent(List<Activity> activitys, boolean isGroupFreeWorkshop) {
	    return activitys.stream()
	            .filter(activity -> activity.isGroupFreeWorkshop() == isGroupFreeWorkshop)
	            .collect(Collectors.toList());
	}
	private List<Activity> filterByActivityCategory(List<Activity> activitys, String activityCategory) {
	    
		return activitys.stream()
			    .filter(activity -> {
			        if (activity.getActivityCategory() != null) {
			            return activity.getActivityCategory().getName().equals(activityCategory);
			        }
			        return false; // Return true if activity category is null
			    })
			    .collect(Collectors.toList());
	}

	@Override
	public List<Activity> searchActivity(String keyword) {
		List<Activity> items=new ArrayList<>();
		
		if(keyword!="") {
			System.out.println("keyword -- "+keyword);
			items=activityRepository.searchByNameOrCategory(keyword);
		}
		
		return items;
	}

	@Override
	public Activity updateAvailibilityStatus(Long id) throws ActivityException {
		Activity activity = findActivityById(id);
		
		activity.setAvailable(!activity.isAvailable());
		activityRepository.save(activity);
		return activity;
	}

	@Override
	public Activity findActivityById(Long activityId) throws ActivityException {
		Optional<Activity> activity = activityRepository.findById(activityId);
		if (activity.isPresent()) {
			return activity.get();
		}
		throw new ActivityException("activity with id" + activityId + "not found");
	}

}

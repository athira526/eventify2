package com.zosh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.zosh.Exception.FestException;
import com.zosh.model.FreeWorkshops;
import com.zosh.model.Fest;
import com.zosh.repository.FreeWorkshopRepository;

@Service
public class FreeWorkshopServiceImplementation implements FreeWorkshopsService {
	
	@Autowired
	private FreeWorkshopRepository eventRepository;

	@Autowired
	private FestService festService;
	
	@Override
	public FreeWorkshops createFreeWorkshop(FreeWorkshops event,Long festId) throws FestException {
		Fest fest=festService.findFestById(festId);
		
		FreeWorkshops createdFreeWorkshop=new FreeWorkshops();
		createdFreeWorkshop.setFest(fest);
		createdFreeWorkshop.setImage(event.getImage());
		createdFreeWorkshop.setStartedAt(event.getStartedAt());
		createdFreeWorkshop.setEndsAt(event.getEndsAt());
		createdFreeWorkshop.setLocation(event.getLocation());
		createdFreeWorkshop.setName(event.getName());
		
		return eventRepository.save(createdFreeWorkshop);
	}

	@Override
	public List<FreeWorkshops> findAllFreeWorkshop() {
		// TODO Auto-generated method stub
		return eventRepository.findAll();
	}

	@Override
	public List<FreeWorkshops> findFestsFreeWorkshop(Long id) {
		// TODO Auto-generated method stub
		return eventRepository.findFreeWorkshopsByFestId(id);
	}

	@Override
	public void deleteFreeWorkshop(Long id) throws Exception {
		FreeWorkshops event=findById(id);
		eventRepository.delete(event);
		
	}

	@Override
	public FreeWorkshops findById(Long id) throws Exception {
		Optional<FreeWorkshops> opt=eventRepository.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("event not found withy id "+id);
		
	}

}

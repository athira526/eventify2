package com.zosh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.Exception.FestException;
import com.zosh.dto.FestDto;
import com.zosh.model.Address;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.repository.AddressRepository;
import com.zosh.repository.FestRepository;
import com.zosh.repository.UserRepository;
import com.zosh.request.CreateFestRequest;

@Service
public class FestServiceImplementation implements FestService {
	@Autowired
	private FestRepository festRepository;
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public Fest createFest(CreateFestRequest req,User user) {
		Address address=new Address();
		address.setCity(req.getAddress().getCity());
		address.setCountry(req.getAddress().getCountry());
		address.setFullName(req.getAddress().getFullName());
		address.setPostalCode(req.getAddress().getPostalCode());
		address.setState(req.getAddress().getState());
		address.setStreetAddress(req.getAddress().getStreetAddress());
		Address savedAddress = addressRepository.save(address);
		
		Fest fest = new Fest();
		
		fest.setAddress(savedAddress);
		fest.setContactInformation(req.getContactInformation());
		fest.setFestCategory(req.getFestCategory());
		fest.setDescription(req.getDescription());
		fest.setImages(req.getImages());
		fest.setName(req.getName());
		fest.setOpeningHours(req.getOpeningHours());
		fest.setRegistrationDate(req.getRegistrationDate());
		fest.setOwner(user);
		Fest savedFest = festRepository.save(fest);

		return savedFest;
	}

	@Override
	public Fest updateFest(Long festId, CreateFestRequest updatedReq)
			throws FestException {
		Fest fest = findFestById(festId);
		if (fest.getFestCategory() != null) {
			fest.setFestCategory(updatedReq.getFestCategory());
		}
		if (fest.getDescription() != null) {
			fest.setDescription(updatedReq.getDescription());
		}
		return festRepository.save(fest);
	}
	
	@Override
	public Fest findFestById(Long festId) throws FestException {
		Optional<Fest> fest = festRepository.findById(festId);
		if (fest.isPresent()) {
			return fest.get();
		} else {
			throw new FestException("Fest with id " + festId + "not found");
		}
	}

	@Override
	public void deleteFest(Long festId) throws FestException {
		Fest fest = findFestById(festId);
		if (fest != null) {
			festRepository.delete(fest);
			return;
		}
		throw new FestException("Fest with id " + festId + " Not found");

	}

	@Override
	public List<Fest> getAllFest() {
		return festRepository.findAll();
	}


	@Override
	public Fest getFestsByUserId(Long userId) throws FestException {
		Fest fests=festRepository.findByOwnerId(userId);
		return fests;
	}



	@Override
	public List<Fest> searchFest(String keyword) {
		return festRepository.findBySearchQuery(keyword);
	}

	@Override
	public FestDto addToFavorites(Long festId,User user) throws FestException {
		Fest fest=findFestById(festId);
		
		FestDto dto=new FestDto();
		dto.setTitle(fest.getName());
		dto.setImages(fest.getImages());
		dto.setId(fest.getId());
		dto.setDescription(fest.getDescription());

		boolean isFavorited = false;
		List<FestDto> favorites = user.getFavorites();
		for (FestDto favorite : favorites) {
			if (favorite.getId().equals(festId)) {
				isFavorited = true;
				break;
			}
		}

		if (isFavorited) {
			favorites.removeIf(favorite -> favorite.getId().equals(festId));
		} else {
			favorites.add(dto);
		}
		
		User updatedUser = userRepository.save(user);
		return dto;
	}

	@Override
	public Fest updateFestStatus(Long id) throws FestException {
		Fest fest=findFestById(id);
		fest.setOpen(!fest.isOpen());
		return festRepository.save(fest);
	}

}

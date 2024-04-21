package com.zosh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.Exception.FestException;
import com.zosh.model.Category;
import com.zosh.model.Fest;
import com.zosh.repository.CategoryRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {
	
	@Autowired
	private FestService festService;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(String name,Long userId) throws FestException {
		Fest fest=festService.getFestsByUserId(userId);
		Category createdCategory=new Category();
		
		createdCategory.setName(name);
		createdCategory.setFest(fest);
		return categoryRepository.save(createdCategory);
	}

	@Override
	public List<Category> findCategoryByFestId(Long id) throws FestException {
		Fest fest=festService.findFestById(id);
		return categoryRepository.findByFestId(id);
	}

	@Override
	public Category findCategoryById(Long id) throws FestException {
		Optional<Category> opt=categoryRepository.findById(id);
		
		if(opt.isEmpty()) {
			throw new FestException("category not exist with id "+id);
		}
		
		return opt.get();
	}

}

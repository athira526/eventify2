package com.zosh.service;

import java.util.List;

import com.zosh.Exception.FestException;
import com.zosh.model.Category;

public interface CategoryService {
	
	public Category createCategory (String name,Long userId) throws FestException;
	public List<Category> findCategoryByFestId(Long festId) throws FestException;
	public Category findCategoryById(Long id) throws FestException;

}

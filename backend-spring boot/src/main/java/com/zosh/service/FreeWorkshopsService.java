package com.zosh.service;

import java.util.List;

import com.zosh.Exception.FestException;
import com.zosh.model.FreeWorkshops;

public interface FreeWorkshopsService {
	
	public FreeWorkshops createFreeWorkshop(FreeWorkshops event,Long festId) throws FestException;
	
	public List<FreeWorkshops> findAllFreeWorkshop();
	
	public List<FreeWorkshops> findFestsFreeWorkshop(Long id);
	
	public void deleteFreeWorkshop(Long id) throws Exception;
	
	public FreeWorkshops findById(Long id) throws Exception;

}

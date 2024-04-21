package com.zosh.request;

import com.zosh.model.Address;

import lombok.Data;

@Data
public class CreateBookingRequest {
 
	private Long festId;
	
	private Address location;
	
    
}

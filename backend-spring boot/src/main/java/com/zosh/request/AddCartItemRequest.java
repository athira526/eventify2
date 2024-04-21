package com.zosh.request;

import java.util.List;

import com.zosh.model.Activity;

import lombok.Data;

@Data
public class AddCartItemRequest {
	
	private Long menuItemId;
	private int quantity;
	private List<String> skills;

}

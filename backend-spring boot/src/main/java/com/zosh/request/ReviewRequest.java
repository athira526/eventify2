package com.zosh.request;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long festId;
    
    private double rating;
    
    private String reviewText;

	
}

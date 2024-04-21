package com.zosh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.zosh.Exception.CartException;
import com.zosh.Exception.BookingException;
import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.model.Booking;
import com.zosh.model.PaymentResponse;
import com.zosh.model.User;
import com.zosh.request.CreateBookingRequest;
import com.zosh.service.BookingService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api")
public class BookingController {
	@Autowired
	private BookingService bookingService;
	@Autowired
	private UserService userService;
	
    @PostMapping("/booking")
	public ResponseEntity<PaymentResponse>  createBooking(@RequestBody CreateBookingRequest booking,
			@RequestHeader("Authorization") String jwt) 
					throws UserException, FestException, 
					CartException, 
					StripeException,
					BookingException{
		User user=userService.findUserProfileByJwt(jwt);
		System.out.println("req user "+user.getEmail());
    	if(booking!=null) {
			PaymentResponse res = bookingService.createBooking(booking,user);
			return ResponseEntity.ok(res);
			
    	}else throw new BookingException("Please provide valid request body");
		
    }
    
 
    
    @GetMapping("/booking/user")
    public ResponseEntity<List<Booking>> getAllUserBookings(	@RequestHeader("Authorization") String jwt) throws BookingException, UserException{
    
    	User user=userService.findUserProfileByJwt(jwt);
    	
    	if(user.getId()!=null) {
    	List<Booking> userBookings = bookingService.getUserBookings(user.getId());
    	return ResponseEntity.ok(userBookings);
    	}else {
    		return new ResponseEntity<List<Booking>>(HttpStatus.BAD_REQUEST);
    	}
    }
    

    

	
}

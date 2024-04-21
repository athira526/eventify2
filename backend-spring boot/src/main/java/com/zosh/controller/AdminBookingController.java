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
import org.springframework.web.bind.annotation.RequestParam;
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
@RequestMapping("/api/admin")
public class AdminBookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private UserService userService;
	
	
    @DeleteMapping("/booking/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long bookingId) throws BookingException{
    	if(bookingId!=null) {
    		bookingService.cancelBooking(bookingId);
    	return ResponseEntity.ok("Booking deleted with id)"+bookingId);
    }else return new ResponseEntity<String>(HttpStatus.BAD_REQUEST) ;
    }
    
    
    @GetMapping("/booking/fest/{festId}")
    public ResponseEntity<List<Booking>> getAllFestBookings(
    		@PathVariable Long festId,
    		@RequestParam(required = false) String booking_status) throws BookingException, FestException{
    	
    		List<Booking> bookings = bookingService.
    				getBookingsOfFest(festId,booking_status);
    		
//    		System.out.println("ORDER STATUS----- "+bookingStatus);
    		return ResponseEntity.ok(bookings);
    		
    	
    	
    }
    
    @PutMapping("/bookings/{bookingId}/{bookingStatus}")
    public ResponseEntity<Booking> updateBookings(@PathVariable Long bookingId,@PathVariable String bookingStatus) throws BookingException, FestException{
    	
    		Booking bookings = bookingService.updateBooking(bookingId, bookingStatus);
    		return ResponseEntity.ok(bookings);
    		
    }

}

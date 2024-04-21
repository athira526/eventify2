package com.zosh.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.zosh.Exception.CartException;
import com.zosh.Exception.BookingException;
import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.model.Booking;
import com.zosh.model.PaymentResponse;
import com.zosh.model.User;
import com.zosh.request.CreateBookingRequest;

public interface BookingService {
	
	 public PaymentResponse createBooking(CreateBookingRequest booking, User user) throws UserException, FestException, CartException, StripeException;
	 
	 public Booking updateBooking(Long bookingId, String bookingStatus) throws BookingException;
	 
	 public void cancelBooking(Long bookingId) throws BookingException;
	 
	 public List<Booking> getUserBookings(Long userId) throws BookingException;
	 
	 public List<Booking> getBookingsOfFest(Long festId,String bookingStatus) throws BookingException, FestException;
	 

}

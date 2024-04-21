package com.zosh.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.model.Activity;
import com.zosh.model.BookingItem;
import com.zosh.repository.BookingItemRepository;
@Service
public class BookingItemServiceImplementation implements BookingItemService {
	@Autowired
	 private BookingItemRepository bookingItemRepository;

	    @Override
	    public BookingItem createBookingIem(BookingItem bookingItem) {
	    	
	    	BookingItem newBookingItem=new BookingItem();
//	    	newBookingItem.setMenuItem(bookingItem.getMenuItem());
//	    	newBookingItem.setBooking(bookingItem.getBooking());
	    	newBookingItem.setQuantity(bookingItem.getQuantity());
	        return bookingItemRepository.save(newBookingItem);
	    }
	    





		





}

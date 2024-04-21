package com.zosh.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.zosh.Exception.CartException;
import com.zosh.Exception.BookingException;
import com.zosh.Exception.FestException;
import com.zosh.Exception.UserException;
import com.zosh.model.Address;
import com.zosh.model.Cart;
import com.zosh.model.CartItem;
import com.zosh.model.Notification;
import com.zosh.model.Booking;
import com.zosh.model.BookingItem;
import com.zosh.model.PaymentResponse;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.repository.AddressRepository;
import com.zosh.repository.CartRepository;
import com.zosh.repository.BookingItemRepository;
import com.zosh.repository.BookingRepository;
import com.zosh.repository.FestRepository;
import com.zosh.repository.UserRepository;
import com.zosh.request.CreateBookingRequest;
@Service
public class BookingServiceImplementation implements BookingService {
	
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private CartSerive cartService;
	@Autowired
	private BookingItemRepository bookingItemRepository;
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private FestRepository festRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PaymentService paymentSerive;
	
	@Autowired
	private NotificationService notificationService;
	

	

	@Override
	public PaymentResponse createBooking(CreateBookingRequest booking,User user) throws UserException, FestException, CartException, StripeException {
		
	    Address shippAddress = booking.getLocation();

	    
	    Address savedAddress = addressRepository.save(shippAddress);
	    
	    if(!user.getAddresses().contains(savedAddress)) {
	    	user.getAddresses().add(savedAddress);
	    }
	    
		
		System.out.println("user addresses --------------  "+user.getAddresses());
		   
		 userRepository.save(user);
	    
	    Optional<Fest> fest = festRepository.findById(booking.getFestId());
	    if(fest.isEmpty()) {
	    	throw new FestException("Fest not found with id "+booking.getFestId());
	    }
	    
	    Booking createdBooking = new Booking();
	    
	    createdBooking.setCustomer(user);
	    createdBooking.setLocation(savedAddress);
	    createdBooking.setCreatedAt(new Date());
	    createdBooking.setBookingStatus("PENDING");
	    createdBooking.setFest(fest.get());

        Cart cart = cartService.findCartByUserId(user.getId());
        
	    List<BookingItem> bookingItems = new ArrayList<>();
	    
	    for (CartItem cartItem : cart.getItems()) {
	        BookingItem bookingItem = new BookingItem();
	       bookingItem.setActivity(cartItem.getActivity());
	       bookingItem.setSkills(cartItem.getSkills());
	       bookingItem.setQuantity(cartItem.getQuantity());
	        bookingItem.setTotalPrice(cartItem.getActivity().getPrice()* cartItem.getQuantity());

	        BookingItem savedBookingItem = bookingItemRepository.save(bookingItem);
	        bookingItems.add(savedBookingItem);
	    }
   
	     Long totalPrice = cartService.calculateCartTotals(cart);

	    createdBooking.setTotalAmount(totalPrice);
	    createdBooking.setFest(fest.get());
  
	    createdBooking.setItems(bookingItems);
	    Booking savedBooking = bookingRepository.save(createdBooking);

	   fest.get().getBookings().add(savedBooking);
	   
	   festRepository.save(fest.get());
	   

	   
	   PaymentResponse res=paymentSerive.generatePaymentLink(savedBooking);
	   return res;

	}

	@Override
	public void cancelBooking(Long bookingId) throws BookingException {
           Booking booking =findBookingById(bookingId);
           if(booking==null) {
        	   throw new BookingException("Booking not found with the id "+bookingId);
           }
		
		    bookingRepository.deleteById(bookingId);
		
	}
	
	public Booking findBookingById(Long bookingId) throws BookingException {
		Optional<Booking> booking = bookingRepository.findById(bookingId);
		if(booking.isPresent()) return booking.get();
		
		throw new BookingException("Booking not found with the id "+bookingId);
	}

	@Override
	public List<Booking> getUserBookings(Long userId) throws BookingException {
		List<Booking> bookings=bookingRepository.findAllUserBookings(userId);
		return bookings;
	} 

	@Override
	public List<Booking> getBookingsOfFest(Long festId,String bookingStatus) throws BookingException, FestException {
		
			List<Booking> bookings = bookingRepository.findBookingsByFestId(festId);
			
			if(bookingStatus!=null) {
				bookings = bookings.stream()
						.filter(booking->booking.getBookingStatus().equals(bookingStatus))
						.collect(Collectors.toList());
			}
			
			return bookings;
	}
//    private List<MenuItem> filterByOffline(List<MenuItem> menuItems, boolean isOffline) {
//    return menuItems.stream()
//            .filter(menuItem -> menuItem.isOffline() == isOffline)
//            .collect(Collectors.toList());
//}
	
	

	@Override
	public Booking updateBooking(Long bookingId, String bookingStatus) throws BookingException {
		Booking booking=findBookingById(bookingId);
		
		System.out.println("--------- "+bookingStatus);
		
		if(bookingStatus.equals("OUT_FOR_DELIVERY") || bookingStatus.equals("DELIVERED") 
				|| bookingStatus.equals("COMPLETED") || bookingStatus.equals("PENDING")) {
			booking.setBookingStatus(bookingStatus);
			Notification notification=notificationService.sendBookingStatusNotification(booking);
			return bookingRepository.save(booking);
		}
		else throw new BookingException("Please Select A Valid Booking Status");
		
		
	}
	
	

}

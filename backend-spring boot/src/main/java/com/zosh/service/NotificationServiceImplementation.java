package com.zosh.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.model.Notification;
import com.zosh.model.Booking;
import com.zosh.model.Fest;
import com.zosh.model.User;
import com.zosh.repository.NotificationRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Override
	public Notification sendBookingStatusNotification(Booking booking) {
		Notification notification = new Notification();
		notification.setMessage("your booking is "+booking.getBookingStatus()+ " booking id is - "+booking.getId());
		notification.setCustomer(booking.getCustomer());
		notification.setSentAt(new Date());
		
		return notificationRepository.save(notification);
	}

	@Override
	public void sendFestNotification(Fest fest, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendPromotionalNotification(User user, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Notification> findUsersNotification(Long userId) {
		// TODO Auto-generated method stub
		return notificationRepository.findByCustomerId(userId);
	}

}

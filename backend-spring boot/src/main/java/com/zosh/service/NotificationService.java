package com.zosh.service;

import java.util.List;

import com.zosh.model.Notification;
import com.zosh.model.Booking;
import com.zosh.model.Fest;
import com.zosh.model.User;

public interface NotificationService {
	
	public Notification sendBookingStatusNotification(Booking booking);
	public void sendFestNotification(Fest fest, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}

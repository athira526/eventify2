package com.zosh.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zosh.model.Booking;
import com.zosh.model.User;

public interface BookingRepository extends JpaRepository<Booking,Long> {
	@Query("SELECT o FROM Booking o WHERE o.customer.id = :userId")
	List<Booking> findAllUserBookings(@Param("userId")Long userId);
    
	@Query("SELECT o FROM Booking o WHERE o.fest.id = :festId")
	List<Booking> findBookingsByFestId(@Param("festId") Long festId);
}

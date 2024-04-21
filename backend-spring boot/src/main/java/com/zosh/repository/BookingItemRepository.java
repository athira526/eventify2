package com.zosh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.model.BookingItem;

public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {

}

package com.zosh.service;

import com.stripe.exception.StripeException;
import com.zosh.model.Booking;
import com.zosh.model.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Booking booking) throws StripeException;

}

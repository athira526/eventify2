# Zosh Activity

1. **User:**
    - ID (Auto-generated)
    - Username
    - Password
    - Email
    - Phone Number
    - Address
    - Role (Customer or Fest Owner)
    - Registration Date
    - Last Login Date
2. **Fest:**
    - ID (Auto-generated)
    - Name
    - Description
    - Cuisine Type
    - Address
    - Contact Information
    - Opening Hours
    - Ratings
    - Image URL
    - Registration Date
3. **Menu Item:**
    - ID (Auto-generated)
    - Name
    - Description
    - Price
    - Category
    - Image URL
    - Availability Status
    - Fest (reference to Fest entity)
    - Creation Date
4. **Booking:**
    - ID (Auto-generated)
    - Customer (reference to User entity)
    - Fest (reference to Fest entity)
    - Total Amount
    - Booking Status
    - Timestamp
    - Delivery Address
    - Items (list of Booking Items)
    - Payment (reference to Payment entity, if applicable)
5. **Booking Item:**
    - ID (Auto-generated)
    - Menu Item (reference to Menu Item entity)
    - Quantity
    - Subtotal
    - Booking (reference to Booking entity)
6. **Payment:**
    - ID (Auto-generated)
    - Booking (reference to Booking entity)
    - Payment Method
    - Payment Status
    - Total Amount
    - Payment Timestamp
7. **~~Delivery Executive:~~**
    - ~~ID (Auto-generated)~~
    - ~~Name~~
    - ~~Contact Information~~
    - ~~Availability Status~~
    - ~~Current Location (Latitude and Longitude)~~
8. **Review/Rating:**
    - ID (Auto-generated)
    - Customer (reference to User entity)
    - Fest (reference to Fest entity)
    - Rating
    - Review Text
    - Timestamp
9. **Promotion/Coupon:**
    - ID (Auto-generated)
    - Code
    - Discount Amount
    - Validity Period
    - Terms and Conditions
10. **Notification:**
    - ID (Auto-generated)
    - Recipient (reference to User, Fest, or Delivery Executive entity)
    - Message
    - Timestamp
    - Read Status
11. **Category:**
    - ID (Auto-generated)
    - Name
12. **Address:**
    - ID (Auto-generated)
    - Street Address
    - City
    - State/Province
    - Postal Code
    - Country
    
13. contact information
    - email
    - mobile
    - twitter
    - instagram

**service**

**service-implementation**

**controller**

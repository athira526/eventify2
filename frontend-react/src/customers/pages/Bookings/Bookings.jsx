import React, { useEffect } from 'react'
import BookingCard from '../../components/Booking/BookingCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersBookings } from '../../../State/Customers/Bookings/Action';

const Bookings = () => {
  const {booking,auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")

  useEffect(()=>{
    dispatch(getUsersBookings(jwt))
  },[auth.jwt])
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Bookings</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
     { booking.bookings.map((booking)=>booking.items.map((item)=><BookingCard status={booking.bookingStatus} booking={item}/>))}
    </div>
    </div>
  )
}

export default Bookings
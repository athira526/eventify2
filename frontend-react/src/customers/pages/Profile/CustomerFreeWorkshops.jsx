import React, { useEffect, useState } from 'react'
import { getAllFreeWorkshops, getActivityFreeWorkshops } from '../../../State/Customers/Fest/fest.action';
import { useDispatch, useSelector } from 'react-redux';
import FreeWorkshopCard from '../../../Admin/FreeWorkshops/FreeWorkshopCard';

const CustomerFreeWorkshops = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
 
  const {fest,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllFreeWorkshops({jwt}))
  },[auth.jwt])
  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
    {fest.freeworkshops.map((item)=> <div>
      <FreeWorkshopCard isCustomer={true} item={item}/>
    </div>)}
   
  </div>
  )
}

export default CustomerFreeWorkshops
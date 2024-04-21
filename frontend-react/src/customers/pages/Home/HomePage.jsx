import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import { fests } from '../../../Data/fests'
import FestCard from "../../components/FestCard/FestCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllFestsAction } from "../../../State/Customers/Fest/fest.action";
// import { getAllFestsAction } from "../../../State/Fest/Action";
// import RestarantCard from "../../components/FestCard/Fest";

const HomePage = () => {
  const { auth, fest } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllFestsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user]);
  return (
    <div className="">
      <section className="-z-50 banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold z-10 py-5">Eventify</p>
          <p className="z-10   text-gray-300 text-xl lg:text-4xl">
          Transforming Occasions into Unforgettable Experiences
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <div className="">
          <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
            Top Categories
          </p>
          <MultipleItemsCarousel />
        </div>
      </section>
      <section className="px-5 lg:px-20">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-400 py-3 ">
            Featured Fests!!
          </h1>
          <div className="flex flex-wrap items-center justify-around ">
            {fest.fests.map((item, i) => (
              <FestCard data={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

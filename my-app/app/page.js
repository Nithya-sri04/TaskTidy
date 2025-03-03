"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState, useRef } from "react";
import BusinessList from "./_components/BusinessList";
import Header from "./_components/Header";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const businessListRef = useRef(null);

  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.categories);
    });
  };

  const getAllBusinessList = () => {
    GlobalApi.getAllBusinessList().then(resp => {
      setBusinessList(resp.businessLists);
    });
  };

  const handleServicesClick = () => {
    if (businessListRef.current) {
      businessListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header onServicesClick={handleServicesClick} />
      <Hero />
      <CategoryList categoryList={categoryList} />
      <div ref={businessListRef}>
        <BusinessList businessList={businessList} title="Popular Business" />
      </div>
    </div>
  );
}



"use client"
import BusinessList from '@/app/_components/BusinessList';
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useEffect, useState, use } from 'react'

async function getParams(params) {
    return await params;
}

function BusinessByCategory({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [businessList, setBusinessList] = useState([]);
    
    useEffect(() => {
        console.log(params);
        if (params) {
            getBusinessList();
        }
    }, [params]);

    const getBusinessList = () => {
        GlobalApi.getBusinessByCategory(params.category)
            .then(resp => {
                setBusinessList(resp?.businessLists);
            })
    }

    return (
        <div>
            <BusinessList title={params.category}
                businessList={businessList} />
        </div>
    )
}

export default BusinessByCategory

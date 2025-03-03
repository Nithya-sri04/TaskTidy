"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react';
import BusinessInfo from '../_components/BusinessInfo';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import BusinessDescription from '../_components/BusinessDescription';
import Header from '@/app/_components/Header';

function BusinessDetail({ params }) {
    const { data, status } = useSession();
    const [business, setBusiness] = useState({});
    const [businessId, setBusinessId] = useState(null);

    useEffect(() => {
        async function fetchParams() {
            const unwrappedParams = await params;
            setBusinessId(unwrappedParams.businessId);
        }
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (businessId) {
            getBusinessById();
        }
    }, [businessId]);

    useEffect(() => {
        checkUserAuth();
    }, [status]);

    const getBusinessById = () => {
        GlobalApi.getBusinessById(businessId).then((resp) => {
            setBusiness(resp.businessList);
        });
    };

    const checkUserAuth = () => {
        if (status === 'loading') {
            return <p>Loading...</p>;
        }

        if (status === 'unauthenticated') {
            signIn('descope');
        }
    };

    return (
        status === 'authenticated' &&
        business && (
            <div className="px-10 md:px-36">
                <Header/>
                <div className="py-8 md:py-20 ">
                    <BusinessInfo business={business} />
                    <div className="grid grid-cols-3 mt-16">
                        <div className="col-span-3 md:col-span-2 order-last md:order-first">
                            <BusinessDescription business={business} />
                        </div>
                        <div>
                            <SuggestedBusinessList business={business} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default BusinessDetail;




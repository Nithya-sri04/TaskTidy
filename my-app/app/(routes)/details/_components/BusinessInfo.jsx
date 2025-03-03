import { Button } from '@/components/ui/button';
import { Clock, Mail, MapPin, Share, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function BusinessInfo({ business }) {
  const mainImageUrl = business?.images?.url;

  return business?.name && (
    <div className='flex flex-col md:flex-row items-start md:items-center gap-6 p-4 bg-white shadow-md rounded-lg'>
      {mainImageUrl ? (
        <Image 
          src={mainImageUrl} 
          alt={business.name} 
          width={150} 
          height={150} 
          className='rounded-full h-[150px] w-[150px] object-cover' 
        />
      ) : (
        <div className='rounded-full bg-gray-200 h-[150px] w-[150px] flex items-center justify-center'>
          No Image
        </div>
      )}
      <div className='flex-1 flex flex-col md:flex-row justify-between w-full'>
        <div className='flex flex-col gap-3'>
          {/* Category name styling refined */}
          <h2 
            className='bg-purple-100 text-primary rounded-full px-3 py-1 text-lg inline-block'
            style={{ display: 'inline-block', maxWidth: 'fit-content' }}
          >
            {business?.category?.name}
          </h2>
          <h2 className='text-2xl md:text-3xl font-bold'>{business.name}</h2>
          <div className='flex flex-col gap-1'>
            <h2 className='flex items-center gap-2 text-lg text-gray-500'>
              <MapPin /> {business.address}
            </h2>
            <h2 className='flex items-center gap-2 text-lg text-gray-500'>
              <Mail /> {business?.email}
            </h2>
          </div>
        </div>
        <div className='flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0'>
          <Button className="flex items-center gap-2"><Share /> Share</Button>
          <h2 className='flex items-center gap-2 text-xl text-primary'><User /> {business.contactPerson}</h2>
          <h2 className='flex items-center gap-2 text-l text-gray-500'> Available 8:00 AM to 10:00 PM</h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;







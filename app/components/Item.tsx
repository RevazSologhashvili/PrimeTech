import Image from 'next/image';
import React from 'react';

interface ItemProps {
    id: string;
    title: string;
    description: string;
    imagePath: string;
    linkTo: string;
}

const Item = (item: ItemProps) => {
  return (
    <div id={item.id} className='bg-white text-black rounded-lg shadow-lg p-5 w-full sm:w-[45%] mb-6'>
      <h2 className='text-2xl sm:text-3xl font-semibold border-b pb-4 mb-4'>{item.title}</h2>
      <Image src={item.imagePath} width={500} height={300} alt='service image' className='w-full h-auto object-cover rounded-md mb-4'/>
      <p className='text-gray-600 font-medium text-base sm:text-lg'>{item.description}</p>
    </div>
  );
}

export default Item;

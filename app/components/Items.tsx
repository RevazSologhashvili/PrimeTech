import React from 'react';
import Item from './Item';
import { servicesData } from '../api/constants';

const Items = () => {
    return (
        <div className="py-10 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">ჩვენი სერვისები</h2>
                <div className="flex flex-wrap justify-center gap-5">
                    {servicesData.map((item) => (
                        <Item
                            key={item.id}
                            title={item.title}
                            id={item.id.toString()}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Items;

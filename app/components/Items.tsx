import React from 'react';
import Item from './Item';
import { customerServices, smallBusinessServices, bigBusinessServices } from '../api/constants';

const Items = () => {
    interface Service {
        id: number;
        title: string;
        description: string;
        imagePath: string;
        linkTo: string;
    }

    const renderItems = (services: Service[]) => (
        <div className="flex flex-wrap justify-center gap-5">
            {services.map((item: Service) => (
                <Item 
                    key={item.id}
                    title={item.title}
                    id={item.id.toString()}
                    description={item.description}
                    imagePath={item.imagePath}
                    linkTo={item.linkTo}
                />
            ))}
        </div>
    );

    return (
        <div className="py-10 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">ჩვენი სერვისები</h2>
                
                <section className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">მომხმარებლის სერვისები</h3>
                    {renderItems(customerServices)}
                </section>
                
                <section className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">მცირე ბიზნესის სერვისები</h3>
                    {renderItems(smallBusinessServices)}
                </section>
                
                <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">დიდი ბიზნესის სერვისები</h3>
                    {renderItems(bigBusinessServices)}
                </section>
            </div>
        </div>
    );
};

export default Items;

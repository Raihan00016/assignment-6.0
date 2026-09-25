import AppCard from '@/components/shared/Appcard';
import { TApp } from '@/types/apps.type';
import React from 'react';

const getAllLibrary = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await res.json();
    return data;
};


const WorkoutPage = async () => {
    const data = await getAllLibrary();
    return (
        <div className='py-4 px-4'>
            <div className="mb-6 text-center ">
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                    THE LIBRARY
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((app: TApp,  ind: number) => (
                    <AppCard key={ind} app={app} />
                ))}
            </div>
        </div>
    );
};

export default WorkoutPage;
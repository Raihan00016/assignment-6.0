import { getAllLibrary } from '@/lib/apps';
import { TApp } from '@/types/apps.type';
import React from 'react';

type TAppDetailsProps = {
    params: {
        id: string
    }
}

const AppDetails = async ({ params }: TAppDetailsProps) => {

    const { id } = await params;
    const allApps = await getAllLibrary();

    const app = allApps.find((app: TApp) => app.id === Number (id));

    console.log(app, "app details")

    return (
        <div>
            App details Page {id}
        </div>
    );
};

export default AppDetails;
import { Suspense } from "react";
import { getAllLibrary } from "@/lib/apps";
import { TApp } from "@/types/apps.type";
import MyPlanClient from "@/components/shared/MyPlanClient";

const MyPlanPage = async () => {
    const allApps: TApp[] = await getAllLibrary();

    return (
        <Suspense>
            <MyPlanClient allApps={allApps} />
        </Suspense>
    );
};

export default MyPlanPage;
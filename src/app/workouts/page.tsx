

import { getAllLibrary } from "@/lib/apps";
import AppCard from "@/components/shared/Appcard";
import { TApp } from "@/types/apps.type";

const WorkoutPage = async () => {
  const data = await getAllLibrary();

  return (
    <div className="py-4 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-white text-xl sm:text-2xl font-bold">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((app: TApp) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
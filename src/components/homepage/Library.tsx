import { TApp } from "@/types/apps.type";
import AppCard from "../shared/Appcard";



const getAllLibrary = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const Library = async () => {
  const data: TApp[] = await getAllLibrary();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h2 className="text-white text-xl sm:text-2xl font-bold">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.slice(0, 6).map((app) => (
          <AppCard key={app.id} app={app}/>
        ))}
      </div>
    </div>
  );
};

export default Library;
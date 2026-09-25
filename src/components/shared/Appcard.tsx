import Image from "next/image";
import { CiClock2, CiStar } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import { TApp } from "@/types/apps.type";

type AppCardProps = {
  app: TApp;
};

const AppCard = ({ app }: AppCardProps) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
  
      <div className="relative w-full h-44">
        <Image src={app.image} alt={app.name} fill className="object-cover" />
      </div>

     
      <div className="p-4">
       
        <div className="flex flex-wrap gap-2 mb-3">
          {app.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-lime-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
            >
              {group}
            </span>
          ))}
        </div>

        
        <h3 className="text-white font-bold text-base">{app.name}</h3>
        <p className="text-zinc-500 text-xs mt-0.5">{app.equipment}</p>

        <div className="flex items-center gap-4 mt-3 text-zinc-400 text-xs">
          <span className="flex items-center gap-1">
            <CiClock2 />
            {app.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FaFire />
            {app.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <CiStar />
            {app.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
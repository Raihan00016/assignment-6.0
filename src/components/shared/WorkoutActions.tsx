"use client";

import { useAppContext } from "@/context/AppProvider";
import { FaRegCalendarPlus, FaCalendarCheck, FaRegBookmark, FaBookmark } from "react-icons/fa";

type WorkoutActionsProps = {
  id: number;
  name: string;
};

const WorkoutActions = ({ id, name }: WorkoutActionsProps) => {
  const { isInPlan, isInSaved, togglePlan, toggleSaved } = useAppContext();

  const inPlan = isInPlan(id);
  const inSaved = isInSaved(id);

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={() => togglePlan(id, name)}
        className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-colors ${inPlan
            ? "bg-zinc-800 text-lime-400 border border-lime-400"
            : "bg-lime-400 text-black hover:bg-lime-300"
          }`}
      >
        {inPlan ? <FaCalendarCheck /> : <FaRegCalendarPlus />}
        {inPlan ? "Added to plan" : "Add to today's plan"}
      </button>

      <button
        onClick={() => toggleSaved(id, name)}
        className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold border transition-colors ${inSaved
            ? "border-lime-400 text-lime-400"
            : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
          }`}
      >
        {inSaved ? <FaBookmark /> : <FaRegBookmark />}
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
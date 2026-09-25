"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CiClock2, CiStar } from "react-icons/ci";
import { FaFire, FaCheck, FaRegCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAppContext, MAX_PLAN_ITEMS } from "@/context/AppProvider";
import { TApp } from "@/types/apps.type";

type MyPlanClientProps = {
    allApps: TApp[];
};

type SortKey = "duration" | "calories" | "rating" | "name";
type Tab = "plan" | "saved";

const MyPlanClient = ({ allApps }: MyPlanClientProps) => {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

    const [tab, setTab] = useState<Tab>(initialTab);
    const [sortBy, setSortBy] = useState<SortKey>("duration");

    const { planIds, savedIds, doneIds, togglePlan, toggleSaved, markDone } =
        useAppContext();


    const planApps = useMemo(
        () => allApps.filter((app) => planIds.includes(app.id)),
        [allApps, planIds]
    );

    const stats = useMemo(
        () => ({
            exercises: planApps.length,
            minutes: planApps.reduce((sum, a) => sum + a.duration, 0),
            calories: planApps.reduce((sum, a) => sum + a.caloriesBurned, 0),
        }),
        [planApps]
    );

    const savedApps = useMemo(
        () => allApps.filter((app) => savedIds.includes(app.id)),
        [allApps, savedIds]
    );

    const activeList = tab === "plan" ? planApps : savedApps;

    const sortedList = useMemo(() => {
        const list = [...activeList];
        switch (sortBy) {
            case "duration":
                return list.sort((a, b) => a.duration - b.duration);
            case "calories":
                return list.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
            case "rating":
                return list.sort((a, b) => b.rating - a.rating);
            case "name":
                return list.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return list;
        }
    }, [activeList, sortBy]);

    return (
        <div className="container mx-auto px-4 sm:px-6 py-10">
  
            <div className="mb-6">
                <h1 className="text-white text-2xl sm:text-3xl font-extrabold uppercase">
                    My Plan
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Cap of {MAX_PLAN_ITEMS} lifts for today. Finish them, then load more.
                </p>
            </div>

   
            <div className="grid grid-cols-3 gap-4 sm:gap-6 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-5 mb-6">
                <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide">Exercises</p>
                    <p className="text-lime-400 text-2xl font-extrabold mt-1">{stats.exercises}</p>
                </div>
                <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide">Minutes</p>
                    <p className="text-white text-2xl font-extrabold mt-1">{stats.minutes}</p>
                </div>
                <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide">Calories</p>
                    <p className="text-white text-2xl font-extrabold mt-1">{stats.calories}</p>
                </div>
            </div>

       
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1">
                    <button
                        onClick={() => setTab("plan")}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === "plan"
                                ? "bg-white text-black"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setTab("saved")}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === "saved"
                                ? "bg-white text-black"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-500">Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md px-2 py-1.5 outline-none"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                        <option value="rating">Rating</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </div>

            {/* List */}
            {sortedList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-800 py-16 flex flex-col items-center justify-center text-center">
                    <h3 className="text-white font-bold text-base uppercase">
                        Nothing here yet
                    </h3>
                    <p className="text-zinc-500 text-sm mt-2 max-w-xs">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/workouts"
                        className="mt-5 rounded-md bg-lime-400 px-5 py-2.5 text-sm font-bold text-black hover:bg-lime-300 transition-colors"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {sortedList.map((app) => {
                        const done = doneIds.includes(app.id);
                        return (
                            <div
                                key={app.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
                            >
                                <div className="relative w-full sm:w-20 h-32 sm:h-16 rounded-lg overflow-hidden shrink-0">
                                    <Image src={app.image} alt={app.name} fill className="object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold text-sm">{app.name}</h3>
                                    <p className="text-zinc-500 text-xs mt-0.5">{app.equipment}</p>
                                    <div className="flex items-center gap-4 mt-2 text-zinc-400 text-xs">
                                        <span className="flex items-center gap-1">
                                            <CiClock2 /> {app.duration} min
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaFire /> {app.caloriesBurned} kcal
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CiStar /> {app.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        href={`/${app.id}`}
                                        className="rounded-md border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-2 hover:border-zinc-500 transition-colors"
                                    >
                                        View Details
                                    </Link>

                                    {tab === "plan" && (
                                        <button
                                            onClick={() => markDone(app.id, app.name)}
                                            className={`flex items-center gap-1.5 rounded-md text-xs font-bold px-3 py-2 transition-colors ${done
                                                    ? "bg-zinc-800 text-lime-400 border border-lime-400"
                                                    : "bg-lime-400 text-black hover:bg-lime-300"
                                                }`}
                                        >
                                            {done ? <FaRegCheckCircle /> : <FaCheck />}
                                            {done ? "Done" : "Mark as Done"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            tab === "plan"
                                                ? togglePlan(app.id, app.name)
                                                : toggleSaved(app.id, app.name)
                                        }
                                        aria-label="Remove"
                                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                                    >
                                        <IoClose size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyPlanClient;
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllLibrary } from "@/lib/apps";
import { TApp } from "@/types/apps.type";
import WorkoutActions from "@/components/shared/WorkoutActions";

type TAppDetailsProps = {
    params: Promise<{ id: string }>;
};

const AppDetails = async ({ params }: TAppDetailsProps) => {
    const { id } = await params;
    const allApps: TApp[] = await getAllLibrary();
    const app = allApps.find((app) => app.id === Number(id));

    if (!app) return notFound();

    const infoRows: [string, string | number][] = [
        ["Equipment", app.equipment],
        ["Difficulty", app.difficulty],
        ["Sets", app.sets],
        ["Reps", app.reps],
        ["Duration", `${app.duration} min`],
        ["Calories", `${app.caloriesBurned} kcal`],
        ["Rating", app.rating],
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 py-10">
            <p className="text-zinc-500 text-sm mb-6">Details Page</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: image */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <Image src={app.image} alt={app.name} fill className="object-cover" />
                </div>

                {/* Right: details */}
                <div>
                    <h1 className="text-white text-2xl sm:text-3xl font-extrabold uppercase">
                        {app.name}
                    </h1>
                    <p className="text-zinc-400 text-sm mt-3">{app.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {app.muscleGroups.map((group) => (
                            <span
                                key={group}
                                className="bg-lime-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                            >
                                {group}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 rounded-lg border border-zinc-800 overflow-hidden">
                        {infoRows.map(([label, value], i) => (
                            <div
                                key={label}
                                className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"
                                    }`}
                            >
                                <span className="text-zinc-500 uppercase text-xs tracking-wide">
                                    {label}
                                </span>
                                <span className="text-white font-medium">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h2 className="text-white font-bold text-sm mb-3">INSTRUCTIONS</h2>
                        <ol className="list-decimal list-inside space-y-2 text-zinc-400 text-sm">
                            {app.instructions.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    <WorkoutActions id={app.id} />
                </div>
            </div>
        </div>
    );
};

export default AppDetails;
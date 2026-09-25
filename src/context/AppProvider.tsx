"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "react-toastify";

type AppContextType = {
    planIds: number[];
    savedIds: number[];
    doneIds: number[];
    togglePlan: (id: number, name?: string) => void;
    toggleSaved: (id: number, name?: string) => void;
    markDone: (id: number, name?: string) => void;
    isInPlan: (id: number) => boolean;
    isInSaved: (id: number) => boolean;
    isDone: (id: number) => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";
const DONE_KEY = "fitlog_done";
export const MAX_PLAN_ITEMS = 5;

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [planIds, setPlanIds] = useState<number[]>([]);
    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [doneIds, setDoneIds] = useState<number[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const storedPlan = localStorage.getItem(PLAN_KEY);
        const storedSaved = localStorage.getItem(SAVED_KEY);
        const storedDone = localStorage.getItem(DONE_KEY);
        if (storedPlan) setPlanIds(JSON.parse(storedPlan));
        if (storedSaved) setSavedIds(JSON.parse(storedSaved));
        if (storedDone) setDoneIds(JSON.parse(storedDone));
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));
    }, [planIds, hydrated]);

    useEffect(() => {
        if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    }, [savedIds, hydrated]);

    useEffect(() => {
        if (hydrated) localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
    }, [doneIds, hydrated]);

    const togglePlan = (id: number, name?: string) => {
        setPlanIds((prev) => {
            const exists = prev.includes(id);

            if (!exists && prev.length >= MAX_PLAN_ITEMS) {
                toast.warning(
                    `Today's plan is full (max ${MAX_PLAN_ITEMS}). Finish or remove one first.`
                );
                return prev;
            }

            toast[exists ? "info" : "success"](
                exists
                    ? `${name ?? "Workout"} removed from today's plan`
                    : `${name ?? "Workout"} added to today's plan`
            );

            if (exists) {
                // also clear its "done" status when it leaves the plan
                setDoneIds((d) => d.filter((p) => p !== id));
                return prev.filter((p) => p !== id);
            }
            return [...prev, id];
        });
    };

    const toggleSaved = (id: number, name?: string) => {
        setSavedIds((prev) => {
            const exists = prev.includes(id);
            toast[exists ? "info" : "success"](
                exists
                    ? `${name ?? "Workout"} removed from saved`
                    : `${name ?? "Workout"} saved for later`
            );
            return exists ? prev.filter((p) => p !== id) : [...prev, id];
        });
    };

    const markDone = (id: number, name?: string) => {
        setDoneIds((prev) => {
            const exists = prev.includes(id);
            if (!exists) toast.success(`${name ?? "Workout"} marked as done 💪`);
            return exists ? prev.filter((p) => p !== id) : [...prev, id];
        });
    };

    const isInPlan = (id: number) => planIds.includes(id);
    const isInSaved = (id: number) => savedIds.includes(id);
    const isDone = (id: number) => doneIds.includes(id);

    return (
        <AppContext.Provider
            value={{
                planIds,
                savedIds,
                doneIds,
                togglePlan,
                toggleSaved,
                markDone,
                isInPlan,
                isInSaved,
                isDone,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
    return ctx;
};
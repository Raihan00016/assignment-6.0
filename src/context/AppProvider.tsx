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
        const exists = planIds.includes(id);

        if (!exists && planIds.length >= MAX_PLAN_ITEMS) {
            toast.warning(
                `Today's plan is full (max ${MAX_PLAN_ITEMS}). Finish or remove one first.`
            );
            return;
        }

        if (exists) {
            setPlanIds((prev) => prev.filter((p) => p !== id));
            setDoneIds((prev) => prev.filter((p) => p !== id));
            toast.info(`${name ?? "Workout"} removed from today's plan`);
        } else {
            setPlanIds((prev) => [...prev, id]);
            toast.success(`${name ?? "Workout"} added to today's plan`);
        }
    };

    const toggleSaved = (id: number, name?: string) => {
        const exists = savedIds.includes(id);

        if (exists) {
            setSavedIds((prev) => prev.filter((p) => p !== id));
            toast.info(`${name ?? "Workout"} removed from saved`);
        } else {
            setSavedIds((prev) => [...prev, id]);
            toast.success(`${name ?? "Workout"} saved for later`);
        }
    };

    const markDone = (id: number, name?: string) => {
        const exists = doneIds.includes(id);

        if (exists) {
            setDoneIds((prev) => prev.filter((p) => p !== id));
        } else {
            setDoneIds((prev) => [...prev, id]);
            toast.success(`${name ?? "Workout"} marked as done 💪`);
        }
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
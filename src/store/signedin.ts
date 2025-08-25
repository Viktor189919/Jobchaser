import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
    authorized : boolean;
    setAuthorized : (isAuthorized : boolean) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            authorized: false,
            setAuthorized: (isAuthorized) => set({ authorized: isAuthorized }),
        }),
        {
            name: 'user-storage',
        }
    )
);
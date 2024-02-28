import { create } from 'zustand';

type UserStore = {
  user: UserResponse | null;
  setUser: (payload: any) => void;
};

type UserResponse = {
  name: string;
  email: string;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserResponse) => set(() => ({ user: user })),
}));

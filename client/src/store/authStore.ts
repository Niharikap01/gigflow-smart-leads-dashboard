import { create } from "zustand";

interface User {
  _id: string;

  name: string;

  email: string;

  role: string;
}

interface AuthState {
  user: User | null;

  token: string | null;

  setAuth: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
}

const savedUser =
  localStorage.getItem(
    "user"
  );

const savedToken =
  localStorage.getItem(
    "token"
  );

export const useAuthStore =
  create<AuthState>(
    (set) => ({
      user: savedUser
        ? JSON.parse(
            savedUser
          )
        : null,

      token:
        savedToken || null,

      setAuth: (
        user,
        token
      ) => {
        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            user
          )
        );

        set({
          user,
          token,
        });
      },

      logout: () => {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        set({
          user: null,
          token: null,
        });
      },
    })
  );
import { nhost, type Session, type User } from "~/modules/nhost";

import { defineStore } from "pinia";
import { ref } from "vue";

export interface IAuthResponse {
  data: any | null;
  error: any | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: ref<User | undefined>(undefined),
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    isAdmin: (state): boolean =>
      state.user ? state.user.roles.includes("admin_app") : false,
    isUser: (state): boolean =>
      state.user ? state.user.roles.includes("user") : false,
    getUserId: (state): string | null => (state.user ? state.user.id : null),
  },
  actions: {
    setAuth(session: Session | null) {
      // console.log(session);
      if (session) {
        this.user = session.user ? session.user : undefined;
      } else {
        this.user = undefined;
      }
    },
    async createAccount(
      email: string,
      password: string
    ): Promise<IAuthResponse> {
      try {
        const res = await nhost.auth.signUp({
          email,
          password,
        });
        if (res.error) {
          return {
            data: null,
            error: res.error.message,
          };
        }
        return {
          data: res,
          error: null,
        };
      } catch (error) {
        console.error(error);
        return {
          data: null,
          error,
        };
      }
    },
    async loginUser(email: string, password: string): Promise<IAuthResponse> {
      try {
        const res = await nhost.auth.signIn({
          email,
          password,
        });
        if (res.error) {
          return {
            data: null,
            error: res.error.message,
          };
        }
        return {
          data: res,
          error: null,
        };
      } catch (error) {
        console.error(error);
        return {
          data: null,
          error,
        };
      }
    },
    async logoutUser(): Promise<IAuthResponse> {
      try {
        const res = await nhost.auth.signOut();
        if (res.error) {
          return {
            data: null,
            error: res.error.message,
          };
        }
        return {
          data: "OK",
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          error,
        };
      }
    },
    async recoverPassword(email: string): Promise<IAuthResponse> {
      const changePasswordUrl = `${
        import.meta.env.VITE_FRONTEND_URL || "http://localhost:4000"
      }/auth/changePassword`;
      try {
        const res = await nhost.auth.resetPassword({
          email,
          options: {
            redirectTo: changePasswordUrl
          },
        });
        console.log('RECOVER PASSWORD', res)
        if (res.error) {
          return {
            data: null,
            error: res.error.message,
          };
        }
        return {
          data: "OK",
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          error,
        };
      }
    },
    async changePassword(newPassword: string): Promise<IAuthResponse> {
      try {
        const res = await nhost.auth.changePassword({
          newPassword,
        });
        if (res.error) {
          return {
            data: null,
            error: res.error.message,
          };
        }
        return {
          data: "OK",
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          error,
        };
      }
    },
  },
});

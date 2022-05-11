import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { useAuthStore } from './stores/auth'
import { nhost } from './modules/nhost'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
    const authStore = useAuthStore();

    nhost.auth
      .isAuthenticatedAsync()
      .then((state) => {
        console.log(state)
        // if (state) {
        //   authStore.setAuth(nhost.auth.getSession());
        // }
      })
      // .then(() => app.mount("#app"));

    nhost.auth.onAuthStateChanged((event, session) => {
      authStore.setAuth(session);
    })
  }
)

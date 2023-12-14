
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from "../views/Dashboard.vue";
import LoginView  from "@/views/WelcomePageView.vue";
import SenderView from  "@/views/SenderView.vue"
import ReceiverView from "@/views/ReceiverView.vue";
import TransactionView from "@/views/TransactionView.vue";
import { useAuthStore } from '@/stores/piniaStore'; // Import your Pinia store for authentication

//const authStore = useAuthStore(); // Initialize your auth store


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: { requiresAuth: true }, // Mark '/' as requiring authentication
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/senders',
      name: 'senders',
      component: SenderView
    },
    {
      path: '/senders/:senderId/receivers',
      name: 'receivers',
      component: ReceiverView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// Global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Initialize your auth store
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!authStore.isAuthenticated) {
      // User is not authenticated; redirect to the login page
      next({ name: 'login' });
    } else {
      // User is authenticated; allow navigation
      next();
    }
  } else {
    // For routes that don't require authentication, allow navigation
    next();
  }
});

export default router;



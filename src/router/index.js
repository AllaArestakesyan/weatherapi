import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Weather from '../views/WeatherPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/weather', name: 'Weather', component: Weather },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

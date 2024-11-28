import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Weather from '../views/WeatherPage.vue';
import Map from '../views/MapPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/weather', name: 'Weather', component: Weather },
  { path: '/map', name: 'Map', component: Map },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

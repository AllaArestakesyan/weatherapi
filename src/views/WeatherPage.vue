<template>
  <nav class="navWeather">
    <ul>
      <router-link to="/">Home</router-link>
    </ul>
    <div>
      <router-link to="/"><img src="/left.png" alt=""> <span>Weather</span></router-link>
      <img src="/menu2.png" alt="">
    </div>
  </nav>
  <div>
    <h1>Weather</h1>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherPage',
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

.navWeather {
  padding: 30px;
  background: linear-gradient(#2e335a, #1c1b33);
  border-bottom: 1px solid #9fa6ab;
  position: sticky;
  top: 0;
  width: 100%;
  font-family: font-Regular;


  @media (max-width:576px) {
    display: flex;
    padding: 12px;
    justify-content: space-between;
  }

  >ul {
    display: flex;
    justify-content: center;
    gap: 20px 30px;

    @media (max-width:576px) {
      display: none;
    }

    a {
      font-weight: bold;
      color: #9fa6ab;
      font-family: font-Regular;

    }

    a.router-link-exact-active {
      color: #fff;
    }
  }

  div {
    display: none;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    @media (max-width:576px) {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    a {
      width: 50px;
      height: 50px;
      padding: 15px 14px;
      display: flex;
      cursor: pointer;
      color: #fff;
      align-items: center;
      font-family: font-Regular;
      gap: 8px;
    }
  }

  >nav {
    position: absolute;
    right: 0;
    top: 65px;
    width: 70%;
    background-color: #19252f;
    display: grid;
    gap: 20px;
    padding-bottom: 10px;
    border-radius: 0 0 20px 20px;

    a {
      font-weight: bold;
      color: #9fa6ab;
    }

    a.router-link-exact-active {
      color: #fff;
    }
  }
}
</style>
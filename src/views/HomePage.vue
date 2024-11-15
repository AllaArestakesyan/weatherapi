<template>
  <nav class="navHome">
    <ul>
      <router-link to="/weather">Weather</router-link>
    </ul>
    <div>
      <img src="/Map.png" alt="">
      <div @mousedown="addSrc(bool)" @mouseup="addSrc(bool)">
        <img :src="str" alt="">
      </div>
      <router-link to="/weather">
        <img src="/Symbol.png" alt="">
      </router-link>
    </div>
  </nav>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      str: "/Default.png",
      bool: true
    }
  },
  methods: {
    addSrc() {
      if (this.bool) {
        this.str = "/Variant2.png"
      } else {
        this.str = "/Default.png"
      }
      this.bool = !this.bool
    }
  },
  mount: {
    value() {
      console.log('Component is about to be unmounted');
    }
  }
});
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: font-Regular;

}

.navHome {
  padding: 30px;
  background: linear-gradient(#2e335a, #1c1b33);
  border-bottom: 1px solid #9fa6ab;
  position: sticky;
  top: 0;
  width: 100%;

  @media (max-width:576px) {
    bottom: 0;
    padding: 12px;
    top: auto;
    position: absolute;
    display: flex;
    justify-content: end;
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
      font-family: font-Regular;
      color: #9fa6ab;
    }

    a.router-link-exact-active {
      color: #fff;
    }
  }

  div {
    justify-content: space-between;
    width: 100%;
    display: none;
    align-items: center;

    @media (max-width:576px) {
      display: flex;
    }

    >div {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: linear-gradient(#3f4783, #1c1b33);
      border-radius: 50% 50% 0 0;
      width: 180px;
      padding: 10px 20px;
      box-shadow: 0 0 20px 2px #3f47838d;

    }

    >a {
      width: 50px;
      display: flex;
      height: 50px;
      flex-direction: column;
      justify-content: space-between;
      padding: 15px 14px;
      font-family: font-Regular;
      cursor: pointer;

      span {
        height: 2px;
        background-color: #fff;
      }
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
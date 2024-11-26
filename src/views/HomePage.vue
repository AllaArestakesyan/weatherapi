<template>
  <div class="homepage">
    <div>
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
      <div class="home">
        <div>
          <p>{{ obj.name ? obj.name : "Yerevan" }}</p>
          <p>{{ obj.temp ? Math.round(obj.temp) : "0" }}<sup>o</sup></p>
          <p>{{ obj.country ? obj.country : "Armenia" }}</p>
        </div>
        <img src="/House 4 3.png" alt="">
        <div class="scroll">

          <div>
            <span>Hourly Forecast</span>
          </div>
          <div ref="scrollRef" class="scroll-container" @mousedown="onMouseDown" @mouseleave="onMouseLeave"
            @mouseup="onMouseUp" @mousemove="onMouseMove" @touchstart="onTouchStart" @touchmove="onTouchMove"
            @touchend="onTouchEnd">
            <div v-for="h in hour" :key="h.name">
              <div>
                <span>{{ new Date(h.time).getHours()<10?"0"+new Date(h.time).getHours():new Date(h.time).getHours()}} </span>
                <span>  AM</span>
              </div>
              <div>
                <img :src="h.icon" alt="">
              </div>
              <div>
                <p>{{ h.temp_c }} <sup>o</sup></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      locations: [],
      str: "/Default.png",
      bool: true,
      text: '',
      obj: {},
      hour: []
    }
  },
  setup() {
    const scrollRef = ref(null);
    const state = reactive({
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    });

    const onMouseDown = (e) => {
      state.isDragging = true;
      state.startX = e.pageX - scrollRef.value.offsetLeft;
      state.scrollLeft = scrollRef.value.scrollLeft;
    };

    const onMouseLeave = () => {
      state.isDragging = false;
    };

    const onMouseUp = () => {
      state.isDragging = false;
    };

    const onMouseMove = (e) => {
      if (!state.isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.value.offsetLeft;
      const walk = (x - state.startX) * 2; // Adjust scroll speed by multiplying
      scrollRef.value.scrollLeft = state.scrollLeft - walk;
    };

    const onTouchStart = (e) => {
      state.isDragging = true;
      state.startX = e.touches[0].pageX - scrollRef.value.offsetLeft;
      state.scrollLeft = scrollRef.value.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!state.isDragging) return;
      const x = e.touches[0].pageX - scrollRef.value.offsetLeft;
      const walk = (x - state.startX) * 2; // Adjust scroll speed by multiplying
      scrollRef.value.scrollLeft = state.scrollLeft - walk;
    };

    const onTouchEnd = () => {
      state.isDragging = false;
    };

    return {
      scrollRef,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
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
  },
  mounted() {
    // localStorage.locations = JSON.stringify(['Erevan', 'New York', 'London', 'Tokyo', 'Sydney'])
    if (typeof localStorage !== 'undefined') {
      if (localStorage.locations === undefined) {
        this.text = "..."
      } else {
        this.locations = JSON.parse(localStorage.locations)
        // console.log(this.locations);
      }
    } else {
      this.text = "..."
    }

    // fetch('https://api.ipbase.com/v1/json/')
    // // fetch('https://ipapi.co/json/')
    //   .then(response => response.json())
    //   .then(data => {
        // const x = this.locations.some(elm => elm.toLowerCase() == data.city.toLowerCase())
        // if (!x) {
        //   // console.log(data.city);
        //   this.locations.push(data.city);
        //   localStorage.locations = JSON.stringify(this.locations)
        // }
        const apiKey = 'd2e7790ef6a84f91a5455407241311'
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${'Yerevan'}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log('===>', data.forecast.forecastday[0].hour);
            for (let elm of data.forecast.forecastday[0].hour) {
              this.hour.push({
                time: elm.time,
                temp_c: elm.temp_c,
                icon: 'https:' + elm.condition?.icon,
                text: elm.condition?.text

              })
            }

            this.obj = {
              name: data.location.name,
              country: data.location.country,
              temp: data.current.temp_c,
              icon: 'https:' + data.current.condition.icon,
              text: data.current.condition.text
            }
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      // })
      // .catch(error => {
      //   console.error('Error fetching location data:', error);
      // });
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

.homepage {
  display: flex;
  justify-content: center;
  background: linear-gradient(0.25turn, #1c1b33, #1f0a27, #1c1b33);

  >div {
    width: 60%;
    border-radius: 20px;
    overflow: hidden;
    margin: 20px 0;
    min-height: 96.2vh;
    box-shadow: 0 0 10px 5px #595775;

    @media (max-width:1000px) {
      width: 80%;

    }

    @media (max-width:700px) {
      border-radius: 0px;
      width: 100%;
      margin: 0;
    }

    .navHome {
      padding: 30px;
      background: linear-gradient(#2e335a, #1c1b33);
      background: linear-gradient(0.25turn, #1c1b33, #531c67, #1c1b33);
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 100;

      @media (max-width:700px) {
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

        @media (max-width:700px) {
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

        @media (max-width:700px) {
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
          background: linear-gradient(0.25turn, #1c1b33, #531c67, #1c1b33);
          border-radius: 50% 50% 0 0;
          width: 160px;
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

    .home {
      background-image: url('@/assets/image.png');
      min-height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      background-position: center;
      padding-top: 20px;
      position: relative;

      @media (max-width:700px) {
        // min-height: 95vh;
        justify-content: space-between;
      }

      >img {

        // width: 50%;
        width: 80%;
        // @media (min-width:1000px) {
        // }

        @media (max-width:700px) {
          width: 100%;
        }
      }

      >div {
        display: grid;
        color: #fff;
        justify-items: center;

        >p:nth-child(1) {
          font-size: clamp(50px, 4vw, 75px);
        }

        >p:nth-child(2) {
          font-size: clamp(80px, 10vw, 100px);
        }

        >p:nth-child(3) {
          font-size: clamp(18px, 5vw, 40px);
          color: #9fa6ab;
        }
      }

      .scroll {
        width: 95%;
        background: linear-gradient(#2e335ada, #2e335ae4, #1c1b33);
        background: linear-gradient(0.25turn, #1c1b33, #531c6788, #1c1b33);
        height: 50%;
        position: absolute;
        box-shadow: inset 0 0 15px 6px rgba(255, 255, 255, 0.348);
        bottom: 0;
        border-radius: 50px 50px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;


        @media (max-width:700px) {
          height: 40%;
        }

        >div:nth-child(1) {
          color: #9fa6ab;
          padding: 20px 30px;
          border-radius: 50px 50px 0 0;
          border-bottom: 1px solid;
          background: linear-gradient(0.25turn, #00000050, #531c6788, #00000050);
          width: 100%;
        }

        >div:nth-child(2) {
          cursor: grab;
          padding: 0 50px;
          width: 90%;
          gap: 20px;
          display: grid;
          margin: auto;
          overflow-x: hidden;
          scrollbar-color: #0000;
          grid-template-columns: repeat(24, 100px);
          grid-auto-rows: 200px;
          scroll-behavior: smooth;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;

          >div {
            cursor: grabbing;
            border-radius: 50px;
            border: 1px solid #48319D;
            background-color: #391c6788;
            display: grid;
            justify-content: center;
            text-align: center;
            padding: 20px 5px;

            img {
              width: 90%;
            }
          }
        }
      }
    }
  }
}
</style>

<!-- https://api.weatherapi.com/v1/forecast.json?q=Yerevan&days=1&key=d2e7790ef6a84f91a5455407241311 -->
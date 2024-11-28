<template>
  <div class="weather">
    <div>

      <nav class="navWeather">
        <div>
          <ul>
            <router-link to="/">Home</router-link>
          </ul>
          <div>
            <router-link to="/"><img src="/left.png" alt=""> <span>Weather</span></router-link>
            <img src="/menu2.png" alt="">
          </div>
        </div>
        <div>
          <div>
            <img src="/search.png" alt="">
            <input placeholder="Search for a city or airport" type="text">
          </div>
        </div>
      </nav>
      <div>
        <p v-if="str">{{ str }}</p>
      </div>
      <div>
        <div v-for="location in weatherData" :key="location.name">
          <img src="/rec2.png" alt="">
          <img :src="location.icon" alt="">
          <div>
            <div>
              <p>{{ location.temp }}<sup>o</sup> </p>
            </div>
            <div>
              <div>
                <p>
                  <!-- <span>H:24<sup>o</sup> </span>  &nbsp;
                <span>L:18<sup>o</sup> </span> -->
                </p>
                <p>{{ location.name }}, {{ location.country }}</p>

              </div>
              <div>
                {{ location.text }}
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

export default defineComponent({
  name: 'WeatherPage',
  data() {
    return {
      locations: [],
      // locations: ['Erevan', 'New York', 'London', 'Tokyo', 'Sydney'],
      weatherData: [],
      str: ""
    };
  },
  mounted() {
    // localStorage.locations = JSON.stringify([ 'Yerevan','New York', 'London', 'Tokyo', 'Sydney'])
    if (typeof localStorage !== 'undefined') {
      if (localStorage.locations === undefined) {
        this.str = 'localStorage is not supported.';
      } else {
        this.locations = JSON.parse(localStorage.locations)
      }
    } else {
      this.str = 'localStorage is not supported.';
    }
    const apiKey = 'd2e7790ef6a84f91a5455407241311'
    this.locations.forEach((location) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.weatherData.push({
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            icon: 'https:' + data.current.condition.icon,
            text: data.current.condition.text
          });
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    });
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
}
body{
  background: linear-gradient(0.25turn, #1c1b33, #1f0a27, #1c1b33);

}
.weather {
  display: flex;
  justify-content: center;
  background: linear-gradient(0.25turn, #1c1b33, #1f0a27, #1c1b33);
  height: 100vh;

  >div {
    width: 60%;
    border-radius: 20px;
    // overflow: hidden;
    // background-color: #ffffff11;
    margin: 20px 0;
    height: 96.2vh;
    // box-shadow: 0 0 10px 5px #595775;
    position: relative;

    @media (max-width:1000px) {
      width: 80%;
    }

    @media (max-width:700px) {
      border-radius: 0px;
      width: 100%;
      margin: 0;
      height: 100vh;
    }

    .navWeather {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      
      >div:nth-child(1) {
        padding: 30px;
        position: sticky;
        top: 0;
        width: 100%;


        @media (max-width:700px) {
          display: flex;
          padding: 12px;
          justify-content: space-between;
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

          @media (max-width:700px) {
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

      >div:nth-child(2) {
        // background: linear-gradient(#2e335a, #1c1b33);
        position: sticky;
        top: 0;
        width: 100%;
        font-family: font-Regular;
        display: flex;
        justify-content: center;

        >div {
          width: clamp(350px, 80%, 100%);
          align-items: center;
          // background: linear-gradient(#2e335a, #1c1b33);
          // background-color: #2e335a;
          background: linear-gradient(0.25turn, #423f74, #423f74, #423f74);

          box-shadow: inset 0 0 15px 3px #242340;
          display: flex;
          padding: 15px 15px;
          gap: 10px;
          border-radius: 8px;

          >input {
            flex-grow: 1;
            background-color: #0000;
            border: none;
            outline: none;
            color: #fff;

            &::placeholder {
              color: #EBEBF5;
            }
          }
        }
      }
    }

    >div:nth-child(2) {
      color: #fff;
      font-size: clamp(16px, 4vw, 25px);
      text-align: center;
      padding-top: 10px;
    }

    >div:nth-child(3) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
      gap: 20px;
      justify-content: center;
      padding: 50px 20px;

      >div {
        position: relative;

        img:nth-child(2) {
          position: absolute;
          right: 0;
          top: -10px;
          width: clamp(100px, 50vw, 160px);
          height: clamp(100px, 50vw, 160px);
        }

        img:nth-child(1) {
          width: 100%;
        }

        >div {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: end;
          gap: 20px;
          padding: 20px;

          >div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            >div {
              display: grid;
              gap: 5px;
            }
          }

          >div:nth-child(1) {
            font-size: clamp(50px, 5vw, 70px);
          }
        }
      }
    }
  }
}
</style>
<template>
    <div class="map">
        <div>
            <nav class="navmap">
                <div>
                    <ul>
                        <router-link to="/">Home</router-link>
                    </ul>
                    <div>
                        <router-link to="/"><img src="/left.png" alt=""> <span>Map</span></router-link>
                        <img src="/menu2.png" alt="">
                    </div>
                </div>
                <!-- <div>
                    <div>
                        <img src="/search.png" alt="">
                        <input placeholder="Search for a city or airport" type="text">
                    </div>
                </div> -->
            </nav>
            <div>
                <LMap ref="leafletMap" class="maps" @update:zoom="onZoomChange" :zoom="zoom"
                 @click="ondblclick"
                    :center="[location.latitude, location.longitude]">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                </LMap>
            </div>

            <div id="minmax">
                <span>
                    <svg @click="plus" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                </span>
                <span>
                    <svg @click="minus" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960">
                        <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                </span>
            </div>

        </div>
    </div>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { LMap, LTileLayer, } from "vue3-leaflet";
import { ref } from "vue";

export default defineComponent({
    name: 'MapPage',
    components: {
        LMap,
        LTileLayer,


    },
    setup() {
        const leafletMap = ref(null);
        const onZoomChange = (newZoom) => {
            console.log("Zoom level changed to:", newZoom);
        };
        return {
            leafletMap,
            onZoomChange,
        };
    },
    data() {
        return {
            location: {
                latitude: 40.1639931, // Default latitude
                longitude: 44.513157, // Default longitude
            },
            error: null,
            mapReady: false,
            zoom: 13
        };
    },
    mounted() {
        if (navigator.geolocation) {
            console.log(navigator);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    // console.log('==>', pos);
                    this.location = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    };
                    this.error = null;
                    this.mapReady = true;
                }
            )
        } else {
            this.error = "Geolocation is not supported by this browser.";
        }
    },
    methods: {
        plus() {
            if (this.leafletMap && this.zoom < 18) {
                this.zoom += 1;
                this.leafletMap.setZoom(this.zoom); // Explicitly call
            }
        },
        minus() {
            if (this.leafletMap && this.zoom > 1) {
                this.zoom -= 1;
                this.leafletMap.setZoom(this.zoom);
            }
        },
        async ondblclick(e) {
            const { lat, lng } = e.latlng;
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const data = await response.json();
                console.log(data);
                console.log(data.address.country);
                let a = confirm(data.address.country)
                console.log(a);
                if (a) {
                    let arr = localStorage.locations ? JSON.parse(localStorage.locations):[]
                    let x = arr.includes(data.address.country)
                    if (!x) {
                        arr.push(data.address.country);
                        localStorage.locations = JSON.stringify(arr)
                    }
                }
            } catch (error) {
                console.error("Reverse Geocoding Failed", error);
            }
        },
        handleLocationError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    this.error = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    this.error = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    this.error = "The request to get user location timed out.";
                    break;
                default:
                    this.error = "An unknown error occurred.";
            }
        },
    },

})
</script>


<style lang="scss">
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

.map {
    display: flex;
    justify-content: center;
    background: linear-gradient(0.25turn, #1c1b33, #1f0a27, #1c1b33);
    min-height: 100vh;

    >div {
        width: 80%;
        border-radius: 20px;
        overflow: hidden;
        margin: 20px 0;
        min-height: 96.2vh;
        box-shadow: 0 0 10px 5px #595775;
        position: relative;
        background-color: #ffffff11;

        @media (max-width:1000px) {
            width: 80%;
        }

        @media (max-width:700px) {
            border-radius: 0px;
            width: 100%;
            margin: 0;
            height: 100vh;
        }

        .navmap {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            position: sticky;
            z-index: 100;
            top: 0;

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
                    z-index: 100;
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
                    position: relative;
                    z-index: 100;
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
                        z-index: 100;
                        position: relative;

                        &::placeholder {
                            color: #EBEBF5;
                        }
                    }
                }
            }
        }

        >div:nth-child(2) {
            padding: 0 30px;
            height: 90%;
            position: relative;
            z-index: 10;

            .maps {
                width: 100%;
                height: 100%;
            }
        }

        #minmax {
            position: absolute;
            z-index: 110;
            right: 5px;
            bottom: 20px;
            background: linear-gradient(0.25turn, #1c1b33, #1f0a27, #1c1b33);
            height: auto;
            display: grid;
            gap: 10px;
            padding: 10px;
            border-radius: 15px;

            svg {
                cursor: pointer;
                fill: #fff;
                border-radius: 50%;
                background: linear-gradient(0.25turn, #34326d, #341142, #34326d);
                padding: 6px;
                width: 30px;
                height: 30px;

                &:hover {
                    fill: #9fa6ab;
                }
            }
        }
    }
}
</style>
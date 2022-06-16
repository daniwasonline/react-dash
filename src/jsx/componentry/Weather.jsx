import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useEffect } from 'react';
export default function Weather() {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: null,
        longitude: null
    });

    const [currentWeather, setCurrentWeather] = useState({
        icon: solid("circle-question"),
        colour: "gray-300",
        temp: null
    });

    useEffect(() => {
        const weatherMapping = {
            0: {
                icon: solid("sun"),
                colour: "yellow-300",
                description: "Sunny"
            },
            1: {
                icon: solid("cloud"),
                colour: "gray-300",
                description: "Cloudy"
            },
            2: {
                icon: solid("cloud-sun"),
                colour: "yellow-300",
                description: "Partly Cloudy"
            },
            3: {
                icon: solid("cloud"),
                colour: "gray-300",
                description: "Overcast"
            },
            45: {
                icon: solid("smog"),
                colour: "gray-300",
                description: "Foggy"
            },
            48: {
                icon: solid("smog"),
                colour: "blue-300",
                description: "Rime Fog"
            },
            51: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Slight Drizzle"
            },
            53: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Moderate Drizzle"
            },
            55: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Heavy Drizzle"
            },
            56: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Slight Drizzle (Freezing)"
            },
            57: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Heavy Drizzle (Freezing)"
            },
            61: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Slight Rain"
            },
            63: {
                icon: solid("cloud-rain"),
                colour: "blue-500",
                description: "Moderate Rain"
            },
            65: {
                icon: solid("cloud-rain"),
                colour: "blue-700",
                description: "Heavy Rain"
            },
            66: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Slight Rain (Freezing)"
            },
            67: {
                icon: solid("cloud-rain"),
                colour: "blue-300",
                description: "Heavy Rain (Freezing)"
            },
            71: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Light Snowfall"
            },
            73: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Moderate Snowfall"
            },
            75: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Heavy Snowfall"
            },
            77: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Grained Snowfall"
            },
            80: {
                icon: solid("cloud-showers-heavy"),
                colour: "blue-300",
                description: "Slight Rain Showers"
            },
            81: {
                icon: solid("cloud-showers-heavy"),
                colour: "blue-300",
                description: "Moderate Rain Showers"
            },
            82: {
                icon: solid("cloud-showers-heavy"),
                colour: "blue-300",
                description: "Heavy Rain Showers"
            },
            85: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Slight Snow Showers"
            },
            86: {
                icon: solid("snowflake"),
                colour: "gray-300",
                description: "Heavy Snow Showers"
            },
            95: {
                icon: solid("cloud-bolt"),
                colour: "gray-300",
                description: "Thunderstorms"
            },
            96: {
                icon: solid("cloud-bolt"),
                colour: "gray-300",
                description: "Thunderstorms with Light Hail"
            },
            99: {
                icon: solid("cloud-bolt"),
                colour: "gray-300",
                description: "Thunderstorms with Heavy Hail"
            }
        };
        
        async function getLocation() {
            setCurrentLocation({
                latitude: localStorage.getItem("lat") ? localStorage.getItem("lat") : "51,5072",
                longitude: localStorage.getItem("long") ? localStorage.getItem("long") : "-0.1275"
            });
        };

        async function getWeather() {
            if (currentLocation.latitude && currentLocation.longitude) {
                const forecast = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&current_weather=true&temperature_unit=${localStorage.getItem("tempUnit") ? localStorage.getItem("tempUnit") : "celsius"}`)
                .then(res => res.json())
                .catch(e => {
                    setCurrentWeather({
                        icon: solid("circle-question"),
                        colour: "gray-300",
                        temp: null
                    });
                });
            
                setCurrentWeather({
                    icon: weatherMapping[forecast.current_weather.weathercode].icon,
                    colour: weatherMapping[forecast.current_weather.weathercode].colour,
                    temp: forecast.current_weather.temperature
                });
            };
        };

        (async () => {
            await getLocation();
            await getWeather();
        })();
    }, [currentLocation.latitude, currentLocation.longitude]);

    return (
        <div className="absolute top-0 right-0 px-5 py-5 bg-gray-800 mx-8 my-8 rounded-xl">
            <h1 className="font-BreezeHeader text-xl text-white font-bold text-center">
                <FontAwesomeIcon icon={currentWeather.icon} size="lg" className={`mr-4 text-${currentWeather.colour}`} /> 
                {Math.round(currentWeather.temp)}°{localStorage.getItem("tempUnit") ? localStorage.getItem("tempUnit").split("")[0].toUpperCase() : "C"}
            </h1>
        </div>
    )
};
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from "@fortawesome/free-solid-svg-icons";
import Bookmarks from "./Bookmarks";
import Settings from "./modals/Settings";
const timeOfDaySuggestions = {
    morning: [
        <span>How about <a className="underline decoration-dotted text-blue-300" href="https://www.starbucks.com/menu">a frappuccino from Starbucks</a>?</span>,
        <span>How about <a className="underline decoration-dotted text-blue-300" href="https://www.doordash.com/search/store/pancakes/">some pancakes</a>?</span>,
        <span>What do you think about having <a className="underline decoration-dotted text-blue-300" href="https://www.doordash.com/search/store/hot%20chocolate/">a hot cocoa</a>?</span>,
        <span>Here are <a className="underline decoration-dotted text-blue-300" href="https://news.google.com">this morning's headlines</a>.</span>,
    ],
    afternoon: [
        <span>How about <a className="underline decoration-dotted text-blue-300" href="https://www.doordash.com/search/store/McDonald's/">lunch from McDonald's</a>?</span>,
        <span>What do you think of having <a className="underline decoration-dotted text-blue-300" href="https://www.doordash.com/search/store/hot%20dogs/">hot dogs</a> for lunch?</span>,
        <span>Let's grab a bite from <a className="underline decoration-dotted text-blue-300" href="https://www.google.com/search?q=jack+in+the+box+near+me">Jack In The Box</a>!</span>,
        <span>Here are <a className="underline decoration-dotted text-blue-300" href="https://news.google.com">the headlines this afternoon</a>.</span>,
    ],
    evening: [
        <span>Let's order some <a className="underline decoration-dotted text-blue-300" href="https://littlecaesars.com">pizza for dinner</a>, shall we?</span>,
        <span>What do you think of having <a className="underline decoration-dotted text-blue-300" href="https://www.olivegarden.com/order-online">a salad from Olive Garden</a>?</span>,
        <span>Take a look at <a className="underline decoration-dotted text-blue-300" href="https://www.doordash.com/">what you can get from local restaurants right now</a>.</span>,
        <span>Here are <a className="underline decoration-dotted text-blue-300" href="https://news.google.com">some of the headlines tonight</a>.</span>,
    ]
};

export default function Greetings() {
    const [randInts] = useState({
        suggestions: Math.floor(Math.random() * timeOfDaySuggestions.morning.length)
    });

    const [DayInformation, setDayInformation] = useState({
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year: new Date().getFullYear(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        localeTime: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    });

    const [timeOfDayGreeting, setTimeOfDayGreeting] = useState(DayInformation.hour < 12 ? 'morning' : DayInformation.hour < 18 ? 'afternoon' : 'evening');
    const [suggestion, setSuggestion] = useState(timeOfDaySuggestions[timeOfDayGreeting][randInts.suggestions]);
    const [showSettingsPanel, toggleSettingsPanel] = useState(false);

    useEffect(() => {
        const secondlyInterval = setInterval(() => {
            setDayInformation({
                month: new Date().getMonth(),
                day: new Date().getDate(),
                year: new Date().getFullYear(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                localeTime: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
                localeDate: new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
            });

            setTimeOfDayGreeting(DayInformation.hour < 12 ? 'morning' : DayInformation.hour < 17 ? 'afternoon' : 'evening');
            setSuggestion(timeOfDaySuggestions[timeOfDayGreeting][randInts.suggestions]);
        }, 1000);

        return () => {
            clearInterval(secondlyInterval);
        };
    }, [DayInformation, timeOfDayGreeting, randInts]);

    return (
        <div className="flex-1 flex flex-col items-start justify-start px-16 py-48 gap-y-2">
            { showSettingsPanel ? <Settings /> : null }
            <h1 className="font-BreezeHeader text-white font-bold text-4xl">
                Good {timeOfDayGreeting},
                <b className="text-green-300"> Danny. </b>
                <button onClick={() => {
                    toggleSettingsPanel(!showSettingsPanel);
                }}>
                    <FontAwesomeIcon className="text-gray-100 hover:text-gray-300 animation-pulse transition-all px-2" size="2xs" icon={faGears} />
                </button>
            </h1>
            <h2 className="font-BreezeText text-white text-2xl">
                Today is <b>{DayInformation.localeDate}</b>.
                <br />
                It's <b>{DayInformation.localeTime}</b>. {suggestion}
            </h2>
            <Bookmarks />
        </div>
    );
};
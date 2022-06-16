import "./css/Core.css";
import Greetings from "./componentry/Greetings.jsx";
import Weather from "./componentry/Weather";
export default function App() {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex justify-start items-start flex-col gap-y-6 flex-wrap">
        <Greetings />
      </div>
        <Weather />
    </div>
  );
};
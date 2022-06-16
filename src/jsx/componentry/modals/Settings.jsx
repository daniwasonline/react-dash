export default function SettingsModal() {
    return (
        <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur-lg transition-all ease-in duration-500 opacity-100 z-10">
            <div className="w-80 px-8 py-8 rounded-xl flex flex-col justify-start items-start absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600">
                <h1 className="font-BreezeHeader font-bold text-2xl text-white">
                    Settings
                </h1>
                <h2 className="font-BreezeHeader font-bold text-xl text-white pt-4">
                    Weather Area & Units
                </h2>
                <p className="font-BreezeText text-lg text-white pt-2">
                    Latitude 
                    <input 
                        id="latInput"
                        className="ml-4 font-BreezeMono bg-gray-800 text-white rounded-lg px-2 text-md w-20" 
                        type="number"
                        placeholder="51.5074"
                        defaultValue={localStorage.getItem("lat") ? localStorage.getItem("lat") : null}
                    />
                </p>
                <p className="font-BreezeText text-lg text-white pt-2">
                    Longitude 
                    <input 
                        id="longInput"
                        className="ml-4 font-BreezeMono bg-gray-800 text-white rounded-lg px-2 text-md w-20" 
                        type="number"
                        placeholder="-0.1275"
                        defaultValue={localStorage.getItem("long") ? localStorage.getItem("long") : null}
                    />
                </p>

                <p className="font-BreezeText text-lg text-white pt-2">
                    Units 
                    <select
                        id="tempUnitInput"
                        className="ml-4 font-BreezeMono bg-gray-800 text-white rounded-lg px-2 text-md w-32" 
                        defaultValue={localStorage.getItem("tempUnit") ? localStorage.getItem("tempUnit") : null}
                    >
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                    </select>
                </p>

                <div className="flex justify-center items-center w-full">
                    <button
                        className="rounded-full px-2 py-1 mt-6 text-center text-sm bg-blue-200 font-BreezeHeader font-bold hover:bg-blue-300 animation-pulse transition-all"
                        onClick={() => {
                            localStorage.setItem("lat", document.getElementById("latInput").value);
                            localStorage.setItem("long", document.getElementById("longInput").value);
                            localStorage.setItem("tempUnit", document.getElementById("tempUnitInput").value.toLowerCase());
                            window.location.reload();
                        }}
                    >Save and Exit</button>
                </div>
            </div>
        </div>
    )
};
export default function BookmarkItemModal() {
      
    return (
        <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur-lg transition-all ease-in duration-500 opacity-100 z-10">
            <div className="w-80 px-8 py-8 rounded-xl flex flex-col justify-start items-start absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600">
                <h1 className="font-BreezeHeader font-bold text-2xl text-white">
                    Bookmark Item
                </h1>
                <p className="font-BreezeText text-lg text-white pt-2">
                    Name 
                    <input 
                        id="nameInput"
                        className="ml-4 font-BreezeMono bg-gray-800 text-white rounded-lg px-2 text-md w-32" 
                        type="text"
                        placeholder="Name"
                    />
                </p>
                <p className="font-BreezeText text-lg text-white pt-2">
                    URL 
                    <input 
                        id="urlInput"
                        className="ml-8 font-BreezeMono bg-gray-800 text-white rounded-lg px-2 text-md w-32"
                        type="url"
                        placeholder="Link here"
                    />
                </p>

                <div className="flex justify-center items-center w-full">
                    <button
                        className="rounded-full px-2 py-1 mt-6 text-center text-sm bg-blue-200 font-BreezeHeader font-bold hover:bg-blue-300 animation-pulse transition-all"
                        onClick={() => {
                            const name = document.getElementById("nameInput").value;
                            let url = document.getElementById("urlInput").value;
                            if (name === "" || url === "") {
                                alert("Please enter a name and valid URL.");
                                return;
                            };
                            // if no http or https is provided, add it
                            if (!url.startsWith("http")) url = `http://${url}`;
                            const bookmark = {
                                name: name,
                                url: url
                            };

                            if (localStorage.getItem("bookmarkStorage")) {
                                localStorage.setItem("bookmarkStorage", JSON.stringify([...JSON.parse(localStorage.getItem("bookmarkStorage")), bookmark]));
                            } else {
                                localStorage.setItem("bookmarkStorage", JSON.stringify([bookmark]));
                            };
                            window.location.reload();
                        }}
                    >Add Bookmark</button>
                </div>
            </div>
        </div>
    )
};
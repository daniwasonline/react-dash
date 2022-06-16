import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import BookmarkItem from "./modals/BookmarkItem";

export default function Bookmarks() {
  // Adds a remove function to the Array prototype (credit to John Resig, creator of jQuery)
  const removeElement = function(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    return arr.push.apply(arr, rest);
  };

  const [bookmarks] = useState(localStorage.getItem("bookmarkStorage") ? JSON.parse(localStorage.getItem("bookmarkStorage")) : []);
  const [showBookmarkModal, toggleSettingsPanel] = useState(false);

  return (
    <div className="flex justify-end items-start flex-col py-4 gap-y-4 flex-wrap">
      { showBookmarkModal ? <BookmarkItem /> : null }
      <h1 className="text-white font-BreezeHeader font-bold text-xl">
        <button className="text-gray-100 hover:text-gray-300 animation-pulse transition-all" onClick={() => {
          toggleSettingsPanel(!showBookmarkModal);
        }}>
          <FontAwesomeIcon icon={solid("square-plus")} className="font-bold" />
        </button>
        <span className="ml-3">Jump back in</span>
      </h1>
      <div className="grid grid-cols-4 gap-x-12 sm:gap-x-4 gap-y-4">
        {bookmarks.map((bookmark, index) => (
          <div className="flex flex-col bg-gray-50 hover:bg-gray-200 w-28 py-2 rounded-xl justify-center items-center" key={index}>
            <a href={bookmark.url} className="flex flex-col items-center gap-y-2">
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}&sz=64`}
                className="h-8 w-8 rounded-full bg-gray-300 border-spacing-4"
                alt={bookmark.name}
              />
              <span className="font-BreezeText font-medium text-md text-gray-900 break-all text-center px-2">
                {bookmark.name}
              </span>
            </a>
            <div className="flex py-2 items-center justify-center">
              <FontAwesomeIcon id={`rubbishIcon-${index}`} icon={solid("trash-can")} className="text-red-300 hover:text-red-400 animation-pulse transition-all" onClick={() => {
                    removeElement(bookmarks, index);
                    localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarks));
                    window.location.reload();
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import ReactDOM from 'react-dom';
import './jsx/css/Root.css';
import "./lib/Bootstrapper.css"; // Bootstrapper for Tailwind
import Core from './jsx/Core';

ReactDOM.render(
  <React.StrictMode>
    <div className="w-0 h-0" id="meta-fadeInScript"> {/* This div is used to contain the scripts that fade-in the background. */}
      {setTimeout(() => { 
        document.getElementById("dash-backend-bg").classList.remove("opacity-0"); 
        document.getElementById("dash-backend-bg").classList.add("opacity-100"); 
        document.getElementById("meta-fadeInScript").remove();
      }, 500) }
    </div>

    <div className="h-screen w-screen absolute -z-40 bg-gray-900" />
    <div id="dash-backend-bg" className="h-screen w-screen absolute -z-30 delay-500 transition-all opacity-0 backdrop-blur-lg backdrop-brightness-25" style={{ backgroundImage: "url(https://source.unsplash.com/1920x1080/?city)" }} />
    <div className="h-screen w-screen absolute -z-20 backdrop-blur-lg" />
    <Core />
  </React.StrictMode>,
  document.getElementById('root')
);
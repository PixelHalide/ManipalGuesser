import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar"
import Footer from "./Footer";
import Home from "./Home";

function App() {
  const [dark, set_dark] = useState(true);

  const switchTheme = () => {
    set_dark(!dark);
  }

  return (
      <div className={`min-h-screen flex flex-col bg-[#EEEEEE] dark:bg-[#181818] transition-all ${dark ? 'dark' : ''}`}>
        <Router>
          <Navbar
          switchTheme={switchTheme}
          darkState={dark}
          />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
  )
}

export default App

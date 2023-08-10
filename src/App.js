import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes"
import { useState } from 'react';


function App() {
  const [isLoading, setIsLoading] = useState(false); // TODO: Replace this by Redux {Global States}

  return (
    <main className='min-h-screen'>
      <BrowserRouter>
        <Routes isLoading={isLoading} setIsLoading={setIsLoading} />
      </BrowserRouter>
    </main>
  );
}

export default App;

import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes"

function App() {
  return (
    <main className='min-h-screen'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </main>
  );
}

export default App;

// import Echo from "./config/websockets";

import { BrowserRouter } from "react-router-dom";
import AppProvider from "./contexts/hooks/index";

import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

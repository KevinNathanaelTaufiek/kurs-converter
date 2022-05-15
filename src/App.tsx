import APIContext, { APIContextProvider } from "./Context/APIContext";
import { PairContextProvider } from "./Context/PairContext";
import ConvertPage from "./pages/ConvertPage";

function App() {
  return (
    <div className="container">
      <APIContextProvider>
        <PairContextProvider>
          <ConvertPage />
        </PairContextProvider>
      </APIContextProvider>
    </div>
  );
}

export default App;

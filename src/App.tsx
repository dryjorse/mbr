import { useEffect } from "react";
import MainPage from "./pages/mainPage/MainPage";

function App() {
  const pass = "999";

  useEffect(() => {
    let curr: string = "";

    while (curr !== pass) {
      curr = prompt("say my name") || "";
    }
  }, []);

  return (
    <div className="min-h-[105vh]">
      <MainPage />
    </div>
  );
}

export default App;

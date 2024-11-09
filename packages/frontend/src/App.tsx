import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InputText } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import { Button } from "../src/components/ui/button";
import Lock from "@mui/icons-material/Lock";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Label>Hola</Label>
        <InputText
          icon={true}
          iconComponent={<Lock fontSize="small"></Lock>}
          type="password"
        ></InputText>
        <Button>
          Iniciar Sesion
        </Button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

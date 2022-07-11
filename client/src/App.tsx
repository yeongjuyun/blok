import { AppRouter } from "./Router";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <div className="App">
      <ThemeProvider
        theme={{
          palette: {
            black: "#282828",
            gray: "#B7B7B7",
          },
        }}
      >
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;

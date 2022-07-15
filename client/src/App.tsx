import { AppRouter } from "./Router";
import { ThemeProvider } from "styled-components";
import ConfirmModal from "./components/ConfirmModal";
import AlertModal from "./components/AlertModal";
import { useSelector } from "react-redux";

function App() {
  const AlertModalState = useSelector((state: any) => state.alertReducer.state);
  const alertData = useSelector((state: any) => state.alertReducer.alertData);
  const ConfirmModalState = useSelector(
    (state: any) => state.modalReducer.isConfirmModal
  );
  const confirmData = useSelector(
    (state: any) => state.modalReducer.confirmData
  );

  return (
    <div className="App">
      <ThemeProvider
        theme={{
          palette: {
            black: "#282828",
            gray: "#949494",
            white: "#FFFFFF",
          },
        }}
      >
        <AppRouter />
        {AlertModalState && <AlertModal alertData={alertData} />}
        {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
      </ThemeProvider>
    </div>
  );
}

export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncFromStorage } from "./store/slices/authSlice";
import IndexRouter from "./routes/indexRouter";

function App() {
  const dispatch = useDispatch();

  /* Global cross-tab sync — runs exactly once for the whole app */
  useEffect(() => {
    const sync = (e) => {
      if (
        e.key === null ||
        ["rbac", "user", "selectedInsuranceType", "accessToken"].includes(
          e.key
        )
      ) {
        dispatch(syncFromStorage());
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [dispatch]);

  return <IndexRouter />;
}

export default App;
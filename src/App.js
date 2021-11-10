import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import './index.css';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => (
          <Route
            exact={route.exact}
            key={idx}
            element={<route.component />}
            path={route.path}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
export default App;
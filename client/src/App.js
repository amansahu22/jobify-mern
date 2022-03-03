import { LandingPage, ErrorPage, RegisterPage, Dashboard } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/landing" element={<LandingPage />} />

        {/* if the url after root domain does not match with the above routes than the default url  */}

        <Route path="*" element={<ErrorPage />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

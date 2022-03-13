import { LandingPage, ErrorPage, RegisterPage, ProtectedRoute } from "./pages";
import {
  AddJob,
  AllJobs,
  SharedLayout,
  Stats,
  Profile,
} from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* all the routes inside of it would be relative to parents Route suppose url to parent route is dashboard than url for the nested route(stats) would be /dashboard/stats */}

          <Route path="profile" element={<Profile />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route index element={<Stats />} />
          {/* setting index would allow us to pre-define the component that will render with parent route as its nested component and index means the same url which is parent component is for more detail watch the url when stats component render*/}
        </Route>

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/landing" element={<LandingPage />} />

        {/* if the url after root domain does not match with the above routes than the default url  */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

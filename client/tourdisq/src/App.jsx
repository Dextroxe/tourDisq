import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import Layout from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Properties from "./pages/properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/property/Property";
import UserDetailContext from "./context/userDetailContext";
import { useState } from "react";
import Bookings from "./pages/bookings/bookings";
import Favourites from "./pages/favourite/favourites";
function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":PropertyId" element={<Property />} /> 
                </Route>
                  <Route path="/bookings" element={<Bookings />} /> 
                  <Route path="/favourites" element={<Favourites />} /> 
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;

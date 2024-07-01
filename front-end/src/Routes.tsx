import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from './pages/AddAd';
import ListAds from "./pages/ListAds";
import MyAccount from "./pages/MyAccount";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ad/:id" element={<AdPage />} />
      <Route path="/post-an-ad" element={<AddAd />} />
      <Route path="/ads" element={<ListAds/>}/>
      <Route path="/my-account" element={<MyAccount/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

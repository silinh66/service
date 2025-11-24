import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateOrder from './pages/CreateOrder';
import PostDetail from './pages/PostDetail';
import MyOrder from './pages/MyOrder';
import Services from './pages/Services';
import Messages from './pages/Messages';
import Payments from './pages/Payments';
import MyAccount from './pages/MyAccount';
import TemplateViewer from './pages/TemplateViewer';
import Blog from './pages/Blog';
import OurStory from './pages/OurStory';
import ContactUs from './pages/ContactUs';

const MainLayout = () => {
    return (
        <div id="wrapper">
            <Header />
            <main id="main" className="">
                <div id="content" role="main" className="content-area">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<PostDetail />} />
                        <Route path="/our-story" element={<OurStory />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-order" element={<CreateOrder />} />
                    <Route path="/my-order" element={<MyOrder />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/template/:id" element={<TemplateViewer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

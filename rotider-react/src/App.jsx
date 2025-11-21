import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateOrder from './pages/CreateOrder';
import PostDetail from './pages/PostDetail';

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
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-order" element={<CreateOrder />} />
                    <Route path="/blog/:slug" element={<PostDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

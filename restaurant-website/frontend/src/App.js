import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import RestaurantList from './pages/RestaurantList';
import AddRestaurant from './pages/AddRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import EditRestaurant from './pages/EditRestaurant';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterOwner from './pages/RegisterOwner';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-owner" element={<RegisterOwner />} />
              
              {/* Protected Routes - ต้องเข้าสู่ระบบเท่านั้น */}
              <Route 
                path="/add-restaurant" 
                element={
                  <ProtectedRoute requiredRole="owner">
                    <AddRestaurant />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-restaurant/:id" 
                element={
                  <ProtectedRoute requiredRole="owner">
                    <EditRestaurant />
                  </ProtectedRoute>
                } 
              />
              
              {/* Public Routes */}
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

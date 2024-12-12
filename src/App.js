//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inbox from './pages/inbox';
import MessageDetail from './pages/MessageDetail';
import Home from './pages/home';
import SendMessage from './pages/SendMessage';
import MainPage from './pages/main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Home/:username" element={<Home />} />
        <Route path="/Inbox/:username" element={<Inbox />} />
        <Route path="/message/:id/:username" element={<MessageDetail />} />
        <Route path="/send-message/:username" element={<SendMessage />} />
      </Routes>
    </Router>
  );
};

export default App;

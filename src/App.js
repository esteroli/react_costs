import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects'
import Project from './components/pages/Project';

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer  autoClose={4000} position='top-center'/>
    <Router>
      <Navbar />
      <Container customClass="min_height">
        <Routes>
          <Route path="*" element={<Home />}></Route>

          <Route path="/projects" element={<Projects />}></Route>

          <Route path="/company" element={<Company />}></Route>

          <Route path="/contact" element={<Contact />}></Route>

          <Route path="/newproject" element={<NewProject />}></Route>

          <Route path="/projects/:id" element={<Project />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
    </>
  );
}

export default App;

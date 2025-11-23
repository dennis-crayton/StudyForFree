import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreateSetPage from './pages/CreateSetPage';
import EditSetPage from './pages/EditSetPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashcardSetPage from './components/FlashcardSetPage';
import StudyModePage from './pages/StudyModePage';
import LearnModePage from './pages/LearnModePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element= {<HomePage />} />
        <Route path="/create-set" element={<CreateSetPage />} />
        <Route path="/edit-set/:id" element={<EditSetPage />} />
        <Route path= "/set/:id" element={<FlashcardSetPage />} />
        <Route path= "/study/:id" element={<StudyModePage />} />
        <Route path= "/learn/:id" element={<LearnModePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

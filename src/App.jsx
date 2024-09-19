import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GreetingPage from './components/GreetingPage';
import NamePage from './components/NamePage';
import PhotoPage from './components/PhotoPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GreetingPage />} />
        <Route path="/name" element={<NamePage />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

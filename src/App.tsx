import { Navigate, Route, Routes } from 'react-router';
import ControlledForm from './components/ControlledForm';
import MainPage from './components/MainPage';
import UncontrolledForm from './components/UncontrolledForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/controlled-form" element={<ControlledForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

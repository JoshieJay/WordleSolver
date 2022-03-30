import { Outlet } from 'react-router-dom';
import Header from './ReusableComponents/Header/Header';
import './App.css';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

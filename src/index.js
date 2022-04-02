import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MainPage from './Pages/MainPage/MainPage';
import Solver from './Pages/Solver/Solver';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route
            index
            element={
              <div>
                Oops! You weren't supposed to get here! Click one of the links
                in the header above to go somewhere useful!
              </div>
            }
          />
          <Route path='/home' element={<MainPage />} />
          <Route path='/solver' element={<Solver />} />
          <Route
            path='*'
            element={
              <div>
                Huh? There is no page here... Not sure we can solve that one.
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

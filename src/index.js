import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MainPage from './Pages/MainPage';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>
                  This is an index route, which shows if there are no matching
                  children routes for the parent.
                </p>
              </main>
            }
          />
          <Route path='/home' element={<MainPage />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

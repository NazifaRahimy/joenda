import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import FilterProvider from './component/Home/filterContaxt';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </HelmetProvider>
);

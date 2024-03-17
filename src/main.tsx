// import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './pages'
import { StoreProvider } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <App />
    </StoreProvider>
)
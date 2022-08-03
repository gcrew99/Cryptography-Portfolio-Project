import * as React from 'react';
import {CodeHolder} from './components/CodeHolder';

import {Header}  from './components/UIComponents/Header';
import './css/App.css';



export function App() {
  return (
    <div className="App">
        <Header/>
        <CodeHolder/>
    </div>
  );
}



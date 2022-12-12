/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import Game from './components/TicTacToe/Game/Game';
import ColorsMatrix from './components/ColorsMatrix/ColorsMatrix';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App(): React.ReactElement {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/colors-matrix' element={<ColorsMatrix />} />
        <Route path='/tic-tac-toe' element={<Game />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

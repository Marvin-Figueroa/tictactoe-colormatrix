import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home(): React.ReactElement {
  return (
    <nav className='home'>
      <Link to='/colors-matrix'>Go to ColorsMatrix</Link>
      <Link to='/tic-tac-toe'>Go to TicTacToe</Link>
    </nav>
  );
}

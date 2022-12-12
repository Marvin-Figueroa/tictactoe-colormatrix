import './NotFound.scss';

export default function NotFound(): React.ReactElement {
  return (
    <div className='not-found'>
      <h1 className='not-found__title'>Oops!!!</h1>
      <h2 className='not-found__message'>
        The page you were looking for does not exist!
      </h2>
    </div>
  );
}

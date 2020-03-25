import React from 'react';

export default ({ count = 7 }: { count?: number }) => {
  const classes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
  const num = count <= 8 ? count : 8;
  const spinners = [];
  for (let i = 0; i < num; i++) {
    spinners.push(
      <div key={`spinner-${i}`} className={`spinner-grow text-${classes[Math.round(Math.random() * classes.length)]}`} role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }

  return (
    <>
      {spinners}
      {/*
      <div className='spinner-grow text-primary' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className='spinner-grow text-secondary' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className='spinner-grow text-success' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className='spinner-grow text-danger' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className='spinner-grow text-warning' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className='spinner-grow text-info' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <div className="spinner-grow text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className='spinner-grow text-dark' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
          */}
    </>
  );
};


import React from 'react';

const Loader = () => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <img 
        src='/icons/loading-circle.svg' 
        alt='loading' 
        width={100} 
        height={100} 
      />
    </div>
  );
};

export default Loader;

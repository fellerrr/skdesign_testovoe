import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader color={'#36D7B7'} size={150} />
    </div>
  );
};

export default Loading;

import React from 'react';

const SpinnerCustom = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="h-8 w-8 border-4 border-indigo-700 border-t-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerCustom;

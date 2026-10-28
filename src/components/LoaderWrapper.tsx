// resources/js/components/LoaderWrapper.tsx
import React, { useEffect, useState } from 'react';
import Loader from './Loader';



const LoaderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return loading ? <Loader /> : <>{children}</>;
};

export default LoaderWrapper;

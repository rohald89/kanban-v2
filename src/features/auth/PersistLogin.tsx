import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  console.log(token);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict mode
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;

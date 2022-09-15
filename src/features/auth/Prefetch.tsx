import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../app/store';
import { boardsApiSlice } from '../boards/boardsApiSlice';

function Prefetch() {
  useEffect(() => {
    store.dispatch(
      boardsApiSlice.util.prefetch('getBoards', 'boardsList', { force: true })
    );
  }, []);

  return <Outlet />;
}

export default Prefetch;

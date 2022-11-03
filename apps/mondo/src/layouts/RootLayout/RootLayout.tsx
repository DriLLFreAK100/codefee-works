import { FC, PropsWithChildren } from 'react';
import { Link, Outlet } from 'react-router-dom';

const RootLayout: FC<PropsWithChildren> = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;

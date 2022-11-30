import { Typography } from 'codefee-kit';
import i18n from 'i18n/i18n';
import { FC, PropsWithChildren } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './RootLayout.module.less';

const makeLinkClassName = ({ isActive }: { isActive: boolean }) => {
  if (isActive) {
    return styles['link--active'];
  }
  return undefined;
};

const RootLayout: FC<PropsWithChildren> = () => {
  return (
    <div className="flex p-4">
      <nav>
        <ul>
          <li>
            <NavLink className={makeLinkClassName} to="/todo">
              <Typography>{i18n.get('Todo')}</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink className={makeLinkClassName} to="/settings">
              <Typography>{i18n.get('Settings')}</Typography>
            </NavLink>
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

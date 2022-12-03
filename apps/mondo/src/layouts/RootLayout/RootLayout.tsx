import { FC, PropsWithChildren } from 'react';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { Typography } from 'codefee-kit';

import { List, ListItem } from '@mondo/components/List';
import i18n from 'i18n/i18n';

import styles from './RootLayout.module.less';

const makeLinkClassName = ({ isActive }: { isActive: boolean }) => {
  if (isActive) {
    return styles['link--active'];
  }
  return undefined;
};

type MenuItem = {
  path: string;
  name: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    path: '/todo',
    name: i18n.get('Todo'),
  },
  {
    path: '/settings',
    name: i18n.get('Settings'),
  },
];

type NavMenuItemProps = {
  item: MenuItem;
};

const NavMenuItem: FC<NavMenuItemProps> = ({ item }) => {
  const { path, name } = item;
  const isMatched = useMatch(path);

  return (
    <ListItem isActive={Boolean(isMatched)}>
      <NavLink className={makeLinkClassName} to={path}>
        <Typography>{name}</Typography>
      </NavLink>
    </ListItem>
  );
};

const RootLayout: FC<PropsWithChildren> = () => {
  return (
    <div className="flex p-4">
      <nav>
        <List className="pr-4">
          {MENU_ITEMS.map((item) => {
            return <NavMenuItem item={item} />;
          })}
        </List>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;

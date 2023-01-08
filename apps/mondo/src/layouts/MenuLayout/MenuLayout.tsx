import { FC, PropsWithChildren } from 'react';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { Typography } from 'codefee-kit';
import cls from 'classnames';

import { List, ListItem } from '@mondo/components/List';
import i18n from 'i18n/i18n';

import styles from './MenuLayout.module.less';

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

  const linkClassName = cls({ [styles['link--active']]: isMatched });

  return (
    <ListItem isActive={Boolean(isMatched)}>
      <NavLink className={linkClassName} to={path}>
        <Typography>{name}</Typography>
      </NavLink>
    </ListItem>
  );
};

const MenuLayout: FC<PropsWithChildren> = () => {
  return (
    <div className="flex p-4">
      <nav className={styles['nav']}>
        <List>
          {MENU_ITEMS.map((item) => {
            return <NavMenuItem key={item.path} item={item} />;
          })}
        </List>
      </nav>

      <div className="p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;

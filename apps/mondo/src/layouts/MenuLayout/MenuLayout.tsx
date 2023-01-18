import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom';
import { IconButton, Typography } from 'codefee-kit';
import cls from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { List, ListItem } from '@mondo/components/List';
import i18n from '@mondo/i18n';
import SideDrawer from '@mondo/components/SideDrawer';

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

  const linkClassName = cls({ ['text-primary']: isMatched });

  return (
    <ListItem isActive={Boolean(isMatched)}>
      <NavLink className={linkClassName} to={path}>
        <Typography>{name}</Typography>
      </NavLink>
    </ListItem>
  );
};

const useMenuLayoutModel = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  let location = useLocation();

  const handleClickMenuIcon = () => {
    setShowSideBar(true);
  };

  const handleClickCloseMenu = useCallback(() => {
    setShowSideBar(false);
  }, []);

  useEffect(() => {
    handleClickCloseMenu();
  }, [location, handleClickCloseMenu]);

  return { showSideBar, handleClickMenuIcon, handleClickCloseMenu };
};

const MenuLayout: FC<PropsWithChildren> = () => {
  const { showSideBar, handleClickMenuIcon, handleClickCloseMenu } =
    useMenuLayoutModel();

  return (
    <>
      <header className="flex items-center border-b border-gray-3 p-1">
        <IconButton variant="subtle" onClick={handleClickMenuIcon}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </IconButton>

        <Typography>{i18n.get('Mondo')}</Typography>
      </header>

      <div className="p-4">
        <Outlet />
      </div>

      <SideDrawer show={showSideBar} onClose={handleClickCloseMenu}>
        <nav>
          <List>
            {MENU_ITEMS.map((item) => {
              return <NavMenuItem key={item.path} item={item} />;
            })}
          </List>
        </nav>
      </SideDrawer>
    </>
  );
};

export default MenuLayout;

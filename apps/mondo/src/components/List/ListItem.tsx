import { forwardRef, LiHTMLAttributes } from 'react';
import cls from 'classnames';
import styles from './ListItem.module.less';

type ListItemProps = {
  isActive?: boolean;
} & LiHTMLAttributes<HTMLLIElement>;

const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { isActive, children, ...passThrough } = props;

  const className = cls({
    [styles['list-item']]: true,
    [styles['list-item--active']]: isActive,
  });

  return (
    <li ref={ref} className={className} {...passThrough}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  isActive: false,
};

export default ListItem;

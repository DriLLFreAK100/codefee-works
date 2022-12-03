import { forwardRef, HTMLAttributes } from 'react';

type ListProps = HTMLAttributes<HTMLUListElement>;

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { children, ...passThrough } = props;
  return (
    <ul ref={ref} {...passThrough}>
      {children}
    </ul>
  );
});

List.displayName = 'List';

export default List;

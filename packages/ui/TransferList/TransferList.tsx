import { forwardRef, HtmlHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

import IconButton from '../IconButton';

type TransferListProps = {
  sourceTitle?: ReactNode;
  sourceData: ListItem[];
  destinationTitle?: ReactNode;
  destinationData: ListItem[];
} & HtmlHTMLAttributes<HTMLDivElement>;

type ListItem = {
  key: any;
  label: ReactNode;
  isSelected: boolean;
};

type ListProps = {
  className: HtmlHTMLAttributes<HTMLDivElement>['className'];
  title: ReactNode;
  data: ListItem[];
};

const List = ({ title, data, className }: ListProps) => {
  const $className = cls(
    'border border-gray-3 rounded-control flex-1',
    className
  );

  return (
    <section className={$className}>
      <header className="p-1 bg-info text-info-on">{title}</header>
      <ul>
        {data.map(({ key, label }) => (
          <li key={key}>{label}</li>
        ))}
      </ul>
    </section>
  );
};

const TransferList = forwardRef<HTMLDivElement, TransferListProps>(
  (props: TransferListProps, ref) => {
    const {
      sourceData,
      sourceTitle,
      destinationData,
      destinationTitle,
      ...passThrough
    } = props;

    return (
      <div className="flex justify-between w-full" ref={ref} {...passThrough}>
        <List className="mr-4" title={sourceTitle} data={sourceData} />

        <section className="flex flex-col [&>*]:mb-1">
          <IconButton variant="minimal">{'>'}</IconButton>
          <IconButton variant="minimal">{'>>'}</IconButton>
          <IconButton variant="minimal">{'<'}</IconButton>
          <IconButton variant="minimal">{'<<'}</IconButton>
        </section>

        <List
          className="ml-4"
          title={destinationTitle!}
          data={destinationData}
        />
      </div>
    );
  }
);

TransferList.displayName = 'TransferList';
TransferList.defaultProps = {
  sourceTitle: 'Source',
  destinationTitle: 'Destination',
};

export default TransferList;

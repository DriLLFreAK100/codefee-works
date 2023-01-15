import { forwardRef, HtmlHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

import IconButton from '../IconButton';

type TransferProps = {
  sourceTitle?: ReactNode;
  sourceData: TransferListItem[];
  destinationTitle?: ReactNode;
  destinationData: TransferListItem[];
} & HtmlHTMLAttributes<HTMLDivElement>;

export type TransferListItem = {
  key: any;
  label: ReactNode;
  isSelected: boolean;
};

type TransferListProps = {
  className: HtmlHTMLAttributes<HTMLDivElement>['className'];
  title: ReactNode;
  data: TransferListItem[];
};

const TransferList = ({ title, data, className }: TransferListProps) => {
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

const Transfer = forwardRef<HTMLDivElement, TransferProps>(
  (props: TransferProps, ref) => {
    const {
      sourceData,
      sourceTitle,
      destinationData,
      destinationTitle,
      ...passThrough
    } = props;

    return (
      <div className="flex justify-between w-full" ref={ref} {...passThrough}>
        <TransferList className="mr-4" title={sourceTitle} data={sourceData} />

        <section className="flex flex-col [&>*]:mb-1">
          <IconButton variant="minimal">{'>'}</IconButton>
          <IconButton variant="minimal">{'>>'}</IconButton>
          <IconButton variant="minimal">{'<'}</IconButton>
          <IconButton variant="minimal">{'<<'}</IconButton>
        </section>

        <TransferList
          className="ml-4"
          title={destinationTitle!}
          data={destinationData}
        />
      </div>
    );
  }
);

Transfer.displayName = 'Transfer';
Transfer.defaultProps = {
  sourceTitle: 'Source',
  destinationTitle: 'Destination',
};

export default Transfer;

import {
  forwardRef,
  HtmlHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import cls from 'classnames';
import sortBy from 'lodash-es/sortBy';
import noop from 'lodash-es/noop';

import IconButton from '../IconButton';
import { Checkbox } from 'codefee-kit';

type TransferProps = {
  sourceTitle?: ReactNode;
  sourceData: TransferListItem[];
  destinationTitle?: ReactNode;
  destinationData: TransferListItem[];
  onValueChange?: (
    source: TransferListItem[],
    destination: TransferListItem[]
  ) => any;
} & HtmlHTMLAttributes<HTMLDivElement>;

export type TransferListItem = {
  key: any;
  label: ReactNode;
  isSelected?: boolean;
};

type TransferListProps = {
  className: HtmlHTMLAttributes<HTMLDivElement>['className'];
  title: ReactNode;
  data: TransferListItem[];
  onToggleItem: (data: TransferListItem) => (isChecked: boolean) => void;
};

const TransferList = ({
  title,
  data,
  className,
  onToggleItem,
}: TransferListProps) => {
  const className$ = cls(
    'border border-gray-3 rounded-control flex-1 flex flex-col',
    className
  );

  return (
    <section className={className$}>
      <header className="py-1 px-3 bg-info text-info-on">{title}</header>
      <ul className="overflow-y-scroll">
        {data.map((datum) => {
          const { key, label, isSelected } = datum;
          return (
            <li key={key} className="py-3 px-3 border-b border-gray-2 truncate">
              <Checkbox
                checked={Boolean(isSelected)}
                gutterBottom={0}
                onValueChange={onToggleItem(datum)}
              />
              {label}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const asUnselected = (d: TransferListItem): TransferListItem => ({
  ...d,
  isSelected: false,
});

const useListHandler = (data: TransferListItem[]) => {
  const [data$, setData$] = useState(data);

  useEffect(() => {
    setData$(sortBy(data, (x) => x.label));
  }, [data]);

  const handleToggle = (item: TransferListItem) => (isChecked: boolean) => {
    setData$((prev) =>
      prev.map((p) => ({
        ...p,
        isSelected: item.key === p.key ? isChecked : p.isSelected,
      }))
    );
  };

  const handleRemove = () => {
    const removed = data$.filter((p) => p.isSelected).map(asUnselected);
    const current = data$.filter((p) => !p.isSelected);
    setData$(sortBy(current, (x) => x.label));
    return { removed, current };
  };

  const handleAdd = (items: TransferListItem[]) => {
    const current = [...data$, ...items];
    setData$(sortBy(current, (x) => x.label));
    return current;
  };

  const handleRemoveAll = () => {
    setData$([]);
    return data$.map(asUnselected);
  };

  return {
    data: data$,
    handleToggle,
    handleRemove,
    handleAdd,
    handleRemoveAll,
  };
};

const Transfer = forwardRef<HTMLDivElement, TransferProps>(
  (props: TransferProps, ref) => {
    const {
      sourceData,
      sourceTitle,
      destinationData,
      destinationTitle,
      className,
      onValueChange: onChange,
      ...passThrough
    } = props;

    const {
      data: internalSource,
      handleToggle: handleToggleSource,
      handleAdd: handleAddSource,
      handleRemove: handleRemoveSource,
      handleRemoveAll: handleRemoveAllSource,
    } = useListHandler(sourceData);

    const {
      data: internalDestination,
      handleToggle: handleToggleDestination,
      handleAdd: handleAddDestination,
      handleRemove: handleRemoveDestination,
      handleRemoveAll: handleRemoveAllDestination,
    } = useListHandler(destinationData);

    const className$ = cls('flex justify-between w-full h-full', className);

    return (
      <div className={className$} ref={ref} {...passThrough}>
        <TransferList
          className="mr-4 w-80"
          title={sourceTitle}
          data={internalSource}
          onToggleItem={handleToggleSource}
        />

        <section className="flex justify-center flex-col [&>*]:mb-1">
          <IconButton
            variant="minimal"
            onClick={() => {
              const { removed, current } = handleRemoveSource();
              const currentDest = handleAddDestination(removed);
              onChange?.(current, currentDest);
            }}
          >
            {'>'}
          </IconButton>
          <IconButton
            variant="minimal"
            onClick={() => {
              const removed = handleRemoveAllSource();
              const currentDest = handleAddDestination(removed);
              onChange?.([], currentDest);
            }}
          >
            {'>>'}
          </IconButton>
          <IconButton
            variant="minimal"
            onClick={() => {
              const { removed, current } = handleRemoveDestination();
              const currentSource = handleAddSource(removed);
              onChange?.(currentSource, current);
            }}
          >
            {'<'}
          </IconButton>
          <IconButton
            variant="minimal"
            onClick={() => {
              const removed = handleRemoveAllDestination();
              const currentSource = handleAddSource(removed);
              onChange?.(currentSource, []);
            }}
          >
            {'<<'}
          </IconButton>
        </section>

        <TransferList
          className="ml-4 w-80"
          title={destinationTitle!}
          data={internalDestination}
          onToggleItem={handleToggleDestination}
        />
      </div>
    );
  }
);

Transfer.displayName = 'Transfer';
Transfer.defaultProps = {
  sourceTitle: 'Source',
  destinationTitle: 'Destination',
  onValueChange: noop,
};

export default Transfer;

import { forwardRef, HtmlHTMLAttributes, MouseEvent, useRef } from 'react';
import { IconButton, Times, Typography, useExposeRef } from 'codefee-kit';
import cls from 'classnames';

import i18n from '@mondo/i18n';

export type SideDrawerDirection = 'left' | 'right' | 'top' | 'bottom';

export type SideDrawerStylableProps = {
  show: boolean;
};

export type SideDrawerProps = {
  onClose: () => void;
} & SideDrawerStylableProps &
  HtmlHTMLAttributes<HTMLDivElement>;

const SideDrawer = forwardRef<HTMLDivElement, SideDrawerProps>(
  (props: SideDrawerProps, ref) => {
    const { children, show, onClose, ...passThrough } = props;

    const sideBarRef = useRef<HTMLDivElement>(null);
    useExposeRef(ref as any, sideBarRef);

    const handleClickDrawerBody = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const handleClickCloseButton = (e: MouseEvent) => {
      e.stopPropagation();
      onClose();
    };

    const drawerClass = cls(
      'fixed top-0 left-0 bg-white p-4 box-border shadow-md h-screen w-60 translate-x-0 transition-transform ease-in-out duration-toggle',
      {
        ['-translate-x-72']: !show,
      }
    );

    const backdropClass = cls(
      'h-screen w-screen fixed top-0 left-0 p-4 bg-backdrop z-sidebar visible transition-visibility-bg-color ease-in-out duration-toggle',
      {
        ['invisible bg-unset']: !show,
      }
    );

    return (
      <div className={backdropClass} onClick={onClose}>
        <div
          ref={sideBarRef}
          className={drawerClass}
          onClick={handleClickDrawerBody}
          {...passThrough}
        >
          <header className="flex justify-between items-center border-b border-secondary pb-2 mb-2">
            <Typography type="h6">{i18n.get('Menu')}</Typography>

            <IconButton onClick={handleClickCloseButton} variant="subtle">
              <Times />
            </IconButton>
          </header>

          {children}
        </div>
      </div>
    );
  }
);

SideDrawer.displayName = 'SideDrawer';
SideDrawer.defaultProps = {};

export default SideDrawer;

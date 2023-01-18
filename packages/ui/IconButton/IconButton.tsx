import { forwardRef, ButtonHTMLAttributes } from 'react';
import { IconButtonVariantType } from 'codefee-kit';
import cls from 'classnames';

type Variant = IconButtonVariantType | 'minimal';

type IconButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_COLORS: Record<Variant, string> = {
  primary:
    'text-primary-on bg-primary hover:bg-primary-light active:bg-primary-dark disabled:bg-primary',
  secondary:
    'text-secondary-on bg-secondary hover:bg-secondary-light active:bg-secondary-dark disabled:bg-secondary',
  minimal:
    'shadow-unset bg-gray-2 hover:bg-gray-3 active:bg-gray-4 disabled:bg-gray-1',
  subtle:
    'shadow-unset bg-inherit hover:bg-gray-2 active:bg-gray-3 disabled:bg-unset',
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props: IconButtonProps, ref) => {
    const { className, variant, ...passThrough } = props;

    const $className = cls(
      'rounded-full border-0 h-control w-control shadow-md transition-bg-color ease-in-out duration-toggle disabled:opacity-60',
      VARIANT_COLORS[variant!],
      className
    );

    return <button ref={ref} className={$className} {...passThrough}></button>;
  }
);

IconButton.displayName = 'IconButton';
IconButton.defaultProps = {
  variant: 'subtle',
};

export default IconButton;

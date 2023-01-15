import { Icon } from 'codefee-kit';
import { IconProps } from 'codefee-kit/dist/components/Icons/Icon';
import { forwardRef } from 'react';

const Trash = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
  const { children, ...passThrough } = props;

  return (
    <Icon
      ref={ref}
      height={1792}
      width={1792}
      viewBox="0 0 1792 1792"
      fontSize={20}
      {...passThrough}
    >
      {children}
      <path
        fill="currentColor"
        d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
      />
    </Icon>
  );
});

Trash.displayName = 'Trash';
Trash.defaultProps = {};

export default Trash;
// import { act, render, renderHook } from '@testing-library/react';
// import useStore, { withStore } from './useStore';

// describe('withStore', () => {
//   test('should be able to create a container with the HOC', () => {
//     const Component = withStore(() => <>something</>);
//     render(<Component />);
//   });
// });

// describe('useStore', () => {
//   test('should be able to modify the store value', () => {
//     const { result } = renderHook(() => useStore(), {
//       wrapper: withStore(() => <>test</>),
//     });

//     act(() => {
//       console.log(result.current);
//       // result.current.current.stuff = 1;
//     });

//     // expect(result.current).toEqual({ stuff: 1 });
//   });
// });

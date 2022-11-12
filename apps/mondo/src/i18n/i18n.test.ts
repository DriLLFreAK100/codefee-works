import i18n from './i18n';

describe('i18n', () => {
  test('should be able to get correct translation records', () => {
    expect(i18n.get('Todo')).toBe('Todo');
  });

  test('should be able to return input untouched if no corresponding translation', () => {
    expect(i18n.get('3456ertyvb567' as any)).toBe('3456ertyvb567');
  });
});

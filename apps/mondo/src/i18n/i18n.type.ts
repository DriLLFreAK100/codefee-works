export type TranlationKeys =
  | '+ Add Item'
  | 'Create'
  | 'Create Todo'
  | 'Description'
  | 'Overview'
  | 'Settings'
  | 'Tags'
  | 'Title'
  | 'Todo';

export type TranslationRecords = { [key in TranlationKeys]: string };

export type TranlationKeys =
  | '+ Add Item'
  | 'Are you sure you want to delete this item?'
  | 'Create'
  | 'Create Todo'
  | 'Description'
  | 'Edit Todo'
  | 'Overview'
  | 'Save'
  | 'Settings'
  | 'Tags'
  | 'Title'
  | 'Todo';

export type TranslationRecords = { [key in TranlationKeys]: string };

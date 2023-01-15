export type TranlationKeys =
  | '+ Add Item'
  | 'Are you sure you want to delete this item?'
  | 'Close'
  | 'Create'
  | 'Create Todo'
  | 'Description'
  | 'Edit Todo'
  | 'Linked'
  | 'Menu'
  | 'Mondo'
  | 'Overview'
  | 'Save'
  | 'Settings'
  | 'Source'
  | 'Tags'
  | 'Title'
  | 'Todo'
  | 'Todo Links'
  | 'Work In-Progress...';

export type TranslationRecords = { [key in TranlationKeys]: string };

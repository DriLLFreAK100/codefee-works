/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RelatedTodoResponse } from './RelatedTodoResponse';

export type TodoDetailsResponse = {
  description?: string;
  id: number;
  related_todos: Array<RelatedTodoResponse>;
  status: number;
  tags?: Array<string>;
  title: string;
};

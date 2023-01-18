/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TodoRelationship } from './TodoRelationship';

export type LinkTodosRequest = {
  relationship_type: TodoRelationship;
  todo_ids: Array<number>;
};

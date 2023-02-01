/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LinkTodosRequest } from '../models/LinkTodosRequest';
import type { Todo } from '../models/Todo';
import type { TodoDetailsResponse } from '../models/TodoDetailsResponse';
import type { UpdateTodoRequest } from '../models/UpdateTodoRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TodoService {

    /**
     * Get all todos
     * Get all todos
     *
     * @returns Todo Get all todos successfully
     * @throws ApiError
     */
    public static getTodos(): CancelablePromise<Array<Todo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/todo',
        });
    }

    /**
     * Create todo
     * Create todo
     *
     * @param requestBody
     * @returns Todo Created a todo item successfully
     * @throws ApiError
     */
    public static createTodo(
        requestBody: UpdateTodoRequest,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/todo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Link todos to a todo
     * Link todos to a todo
     *
     * @param id
     * @param requestBody
     * @returns boolean Todos linked successfully
     * @throws ApiError
     */
    public static linkTodos(
        id: number,
        requestBody: LinkTodosRequest,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/todo/link/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get todo by ID
     * Get todo by ID
     *
     * @param id
     * @returns TodoDetailsResponse Get todo successfully
     * @throws ApiError
     */
    public static getTodo(
        id: number,
    ): CancelablePromise<TodoDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/todo/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update todo by ID
     * Update todo by ID
     *
     * @param id
     * @param requestBody
     * @returns Todo Updated todo successfully
     * @throws ApiError
     */
    public static updateTodo(
        id: number,
        requestBody: UpdateTodoRequest,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/todo/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete todo by ID
     * Delete todo by ID
     *
     * @param id
     * @returns boolean Deleted todo successfully
     * @throws ApiError
     */
    public static deleteTodo(
        id: number,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/todo/{id}',
            path: {
                'id': id,
            },
        });
    }

}

import type { Query } from '../../../core/use-case.ts'
import type { Todo } from '../domain/todo.ts'
import type { TodoRepository } from '../domain/todo.repository.ts'

export class GetTodosQry implements Query<Todo[]> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async handle(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}

import type { Query } from '../core/use-cases/use-case.ts'

export interface TodoDto {
  userId: number
  id: number
  title: string
  completed: boolean
}

export class GetTodoQry implements Query<TodoDto, { id: number }> {
  async handle(input?: { id: number }): Promise<TodoDto> {
    const id = input?.id ?? 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as TodoDto
  }
}

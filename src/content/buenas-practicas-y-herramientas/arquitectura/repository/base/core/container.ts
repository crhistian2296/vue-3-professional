import { UseCaseService } from './use-cases/use-case-service.ts'
import { GetTodosQry } from '../application/get-todos.qry.ts'

export const useCaseService = new UseCaseService()
export const getTodoQry = new GetTodosQry()

export interface Todo {
  id: number
  text: string
  done: boolean
  owner?: string | null
}

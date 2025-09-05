export interface Board {
  id: string
  name: string
  description?: string
  ownerId: string
  createdAt?: Date
  updatedAt?: Date
}


export interface BoardMember {
  id: string
  role: "OWNER" | "ADMIN" | "MEMBER" | "OBSERVER" | "USER"
  boardId: string
  userId: string
}
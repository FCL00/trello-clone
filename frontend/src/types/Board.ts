type Roles = "OWNER" | "ADMIN" | "MEMBER" | "OBSERVER" | "USER"

export interface Member {
  id: string
  role: Roles
  boardId: string
  userId: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface Owner {
  id: string
  name: string
  email: string
}

export interface Board {
  id: string
  name: string
  description: string
  ownerId: string
  createdAt: string
  updatedAt: string
}


export interface Boards extends Board {
  members: Member[]
  owner: Owner
}


export type BoardInput = Pick<Board, "name" | "description">

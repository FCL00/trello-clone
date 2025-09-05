export interface Tasks {
  boardId: string
  userId: string
  title: string  
  description: string
  position: number
  startDate?: Date
  endDate?: Date
  status: "ongoing" | "completed" | "archive"
}

export interface ChecklistItem {
  taskId: string
  userId: string
  title: string
  description: string
  position: number
  status: "ongoing" | "completed" | "archive"
}

export interface Comments {
  checklistItemId: string
  userId: string
  body: string
}
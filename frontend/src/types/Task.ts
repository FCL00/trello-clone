export interface ChecklistItem {
  id: number
  title: string
  description: string
  status: "ongoing" | "completed"
}

export interface ListItem {
  id: number
  title: string
  description: string
  checklist: ChecklistItem[]
}

type Status = "ongoing" | "completed" | "cancelled" | "archive"

export interface CheckList {
  id: string
  taskId: string
  title: string
  description: string
  status: Status
  position: number
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  userId: string
  title: string
  position: number
  createdAt: string
  updatedAt: string
  startDate: string
  endDate: string
  status: Status
  checklistItem: CheckList[]
}


export interface TaskData {
  title: string
  position: number
  startDate?: string
  endDate?: string
  status: Status
}


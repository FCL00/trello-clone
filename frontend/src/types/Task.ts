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

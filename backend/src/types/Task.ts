export interface Tasks {
  title: string
  userId: string
  description: string
  startDate: Date
  endDate: Date
  status: "ongoing" | "completed" | "archive"
}
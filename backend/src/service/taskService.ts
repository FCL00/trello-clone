// service/taskService.ts
import prisma from "@/config/prisma.js";
import type { Tasks } from "@/types/Task.js";

export const TaskService = {
  // Find all tasks for a given board
  findAll: async (boardId: string) => {
    return await prisma.task.findMany({
      where: { boardId },
      orderBy: { position: "asc" },
      include: {
        checklistItem: {
          orderBy: { position: "asc" },
        },
      },
    });
  },

  findById: async (id: string) => {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        checklistItem: {
          orderBy: { position: "asc" },
        },
      },
    });
  },

  create: async (task: Tasks) => {
    return await prisma.task.create({
      data: task,
      include: { checklistItem: true },
    });
  },

  update: async (id: string, task: Partial<Tasks>) => {
    return await prisma.task.update({
      where: { id },
      data: task,
      include: { checklistItem: true },
    });
  },

  delete: async (id: string) => {
    return await prisma.task.delete({ where: { id } });
  },
};

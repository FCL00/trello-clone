import prisma from "@/config/prisma.js";
import type { ChecklistItem } from "@/types/Task.js";

export const checkListService = {
  findAll: async () => {
    return await prisma.checkListItem.findMany({
      include: { comments: true, task: true },
    });
  },

  findAllByTask: async (taskId: string) => {
  return await prisma.checkListItem.findMany({
    where: { taskId },
    orderBy: { position: "asc" },
    include: { comments: true }
  })
},

  findById: async (id: string) => {
    return await prisma.checkListItem.findUnique({
      where: { id },
      include: { comments: true, task: true },
    });
  },

  create: async (taskId: string, item: ChecklistItem) => {
    const last = await prisma.checkListItem.findFirst({
      where: { taskId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const GAP = 65536;
    const nextPos = last ? last.position + GAP : GAP;

    return await prisma.checkListItem.create({
      data: {
        title: item.title,
        description: item.description,
        status: item.status ?? "ongoing",
        position: nextPos, 
        task: { connect: { id: taskId } },
      },
    });
  },

  update: async (id: string, item: Partial<ChecklistItem>) => {
    return await prisma.checkListItem.update({
      where: { id },
      data: {
        ...(item.title !== undefined && { title: item.title }),
        ...(item.description !== undefined && {
          description: item.description,
        }),
        ...(item.status !== undefined && { status: item.status }),
        ...(item.taskId !== undefined && {
          task: { connect: { id: item.taskId } },
        }),
        ...(item.position !== undefined && { position: item.position }), 
        ...(item.taskId !== undefined && {
          task: { connect: { id: item.taskId } },
        }),
      },
    });
  },

  delete: async (taskId: string, id: string) => {
    return await prisma.checkListItem.delete({
      where: { id, taskId },
    });
  },
};

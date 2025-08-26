import prisma from "@/config/prisma.js"
import type { Tasks } from "@/types/Task.js";


export const TaskService = {
    findAll: async () => {
        return await prisma.task.findMany();
    },  

    findById: async (id: string) => {
        return await prisma.task.findUnique({ where: {id: id}})
    },


    create: async (task: Tasks) => {
        return await prisma.task.create({data: task})
    },

    update: async (id: string, task: Tasks) => {
        return await prisma.task.update({ where: { id: id}, data: task})
    },

    delete: async (id: string) => {
        return await prisma.task.delete({ where: {id: id}})
    },

}
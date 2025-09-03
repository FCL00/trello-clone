import prisma from "@/config/prisma.js"
import type { ChecklistItem } from '@/types/Task.js'


export const checkListService = {

    findAll: async () => {
        return await prisma.checkListItem.findMany({
            include: { comments: true, task: true }
        })
    },
    

    findById: async (id: string) => {
        return await prisma.checkListItem.findUnique({
            where: {id},
            include: { comments: true, task: true }
        })
    },



    create: async (taskId:string, item: ChecklistItem) => {
        return await prisma.checkListItem.create({ data: {
            title: item.title,
            description: item.description,
            status: item.status ?? 'ongoing',
            task: { connect: { id: taskId }}
        }})
    },


    update: async (id: string, item: Partial<ChecklistItem>) => {
        return await prisma.checkListItem.update({
            where: { id },
            data: {
            ...(item.title && { title: item.title }),
            ...(item.description && { description: item.description }),
            ...(item.status && { status: item.status }),
            ...(item.taskId && { task: { connect: { id: item.taskId } } }),
            },
        })
    },


    delete: async (taskId: string, id: string) => {
        return await prisma.checkListItem.delete({
            where: {id, taskId}
        })
    }
    

}
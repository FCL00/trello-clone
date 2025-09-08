import prisma from "@/config/prisma.js";
import type { Board } from "@/types/Boards.js";

export const boardService = {
  // Fetch boards where user is owner or member
  async findAll(userId: string) {
    return await prisma.board.findMany({
      where: {
        OR: [{ ownerId: userId }, { members: { some: { userId } } }],
      },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
        owner: { select: { id: true, name: true, email: true } },
      },
    });
  },

  async findById(boardId: string) {
    return await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
        tasks: {
          include: { checklistItem: true },
        },
      },
    });
  },

  async create(data: Board) {
    return await prisma.board.create({
      data: {
        name: data.name,
        description: data.description ?? "",
        ownerId: data.ownerId,
        members: {
          create: {
            userId: data.ownerId,
            role: "OWNER",
          },
        },
      },
    });
  },

  async update(boardId: string, data: Partial<Board>) {
    return await prisma.board.update({
      where: { id: boardId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
      },
    })
  },

  async delete(boardId: string) {
    return await prisma.board.delete({
      where: { id: boardId },
    });
  },

  async addMember(
    boardId: string,
    userId: string,
    role: "OWNER" | "ADMIN" | "MEMBER" | "OBSERVER" | "USER" = "MEMBER"
  ) {
    return await prisma.boardMember.create({
      data: {
        boardId,
        userId,
        role,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  },

  async removeMember(boardId: string, userId: string) {
    return await prisma.boardMember.deleteMany({
      where: { boardId, userId },
    });
  },

  async listMembers(boardId: string) {
    return await prisma.boardMember.findMany({
      where: { boardId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  },
};

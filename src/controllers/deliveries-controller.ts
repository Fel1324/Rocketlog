import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { z } from "zod"

export class DeliveriesController {
  async index(request: Request, response: Response){
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: {name: true, email: true }}
      }
    })

    return response.json(deliveries)
  }

  async create(request: Request, response: Response){
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string()
    })

    const { user_id, description } = bodySchema.parse(request.body)
    const user = await prisma.user.findUnique({
      where: { id: user_id }
    })

    if(!user){
      throw new AppError("User not found", 404)
    }

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description
      }
    })

    return response.status(201).json()
  }
}

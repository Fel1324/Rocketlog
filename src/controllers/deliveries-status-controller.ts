import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { z } from "zod"

export class DeliveriesStatusController{
  async update(request: Request, response: Response){
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered", "canceled"]),
    })

    const { id } = paramsSchema.parse(request.params)
    const { status } = bodySchema.parse(request.body)
    const delivery = await prisma.delivery.findUnique({
      where: { id }
    })

    if(!delivery){
      throw new AppError("Delivery not found", 404)
    }

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      }
    })

    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: status
      }
    })

    return response.json()
  }
}

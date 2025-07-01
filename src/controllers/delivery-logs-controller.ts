import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { z } from "zod"

export class DeliveryLogsController{
  async show(request: Request, response: Response){
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    })

    const { delivery_id } = paramsSchema.parse(request.params)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        logs: true,
        user: { select: { id: true, name: true, email: true }}
      }
    })

    if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
      throw new AppError("The user can only view their deliveries", 401)
    }

    return response.json(delivery)
  }

  async create(request: Request, response: Response){
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string()
    })

    const { delivery_id, description } = bodySchema.parse(request.body)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id }
    })

    if(!delivery){
      throw new AppError("Delivery not found", 404)
    }

    if(delivery.status === "canceled"){
      throw new AppError("This order has already been canceled", 404)
    }
    
    if(delivery.status === "delivered"){
      throw new AppError("This order has already been delivered", 404)
    }

    if(delivery.status === "processing"){
      throw new AppError("Change status to shipped", 404)
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    })

    return response.status(201).json()
  }
}

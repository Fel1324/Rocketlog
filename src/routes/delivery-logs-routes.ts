import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
)

deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
)

export { deliveryLogsRoutes }

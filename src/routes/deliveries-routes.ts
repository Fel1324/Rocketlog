import { Router } from "express"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { DeliveriesController } from "@/controllers/deliveries-controller"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController()
const deliveriesStatusController = new DeliveriesStatusController()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveriesRoutes.get("/", deliveriesController.index)
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update)

export { deliveriesRoutes };

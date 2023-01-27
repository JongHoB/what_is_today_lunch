import { Router } from "express";
import mapController from "../controllers/mapController";

const mapRouter = Router();

mapRouter.post("", mapController.createRestaurant);
mapRouter.get("", mapController.getRestaurants);
mapRouter.patch("", mapController.updateRestaurant);
mapRouter.delete("", mapController.deleteRestaurant);
mapRouter.post("/review", mapController.createRestaurantReview);
mapRouter.patch("/review", mapController.updateRestaurantReview);
mapRouter.delete("/review", mapController.deleteRestaurantReview);

export default mapRouter;

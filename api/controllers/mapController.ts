import { Request, Response } from "express";
import { asyncErrorHandler, throwCustomError } from "../middlewares/error";
import mapService from "../services/mapService";

class mapController {
  static createRestaurant = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const {
        mapCategoryId,
        phoneNumber,
        address,
        name,
        imageUrl,
        linkUrl,
        price,
        latitude,
        longitude,
      } = request.body;

      console.log(request.body);

      if (
        !mapCategoryId ||
        !phoneNumber ||
        !address ||
        !name ||
        !price ||
        !latitude ||
        !longitude
      ) {
        const errorMessage: string = "There is missing contents";
        throwCustomError(errorMessage, 400);
      }
      await mapService.createRestaurant(
        mapCategoryId,
        phoneNumber,
        address,
        name,
        imageUrl,
        linkUrl,
        price,
        latitude,
        longitude
      );

      return response.status(201).json({ message: "created" });
    }
  );

  static createRestaurantReview = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const { userId, content, imageUrl, mapId } = request.body;
      if (!userId || !content || !mapId) {
        const errorMessage: string = "There is missing contents";
        throwCustomError(errorMessage, 400);
      }
      await mapService.createRestaurantReview(userId, content, mapId, imageUrl);
      return response.status(201).json({ message: "created" });
    }
  );

  static getRestaurants = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const cagegoryId: number = request.query.category
        ? Number(request.query.category)
        : 0;

      const result = await mapService.getRestaurants(cagegoryId);

      return response.status(200).json({ data: result });
    }
  );

  static updateRestaurant = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const {
        mapId,
        mapCategoryId,
        phoneNumber,
        address,
        name,
        imageUrl,
        linkUrl,
        price,
        latitude,
        longitude,
      } = request.body;
      if (!mapId) throwCustomError("Need to send mapId", 400);
      await mapService.updateRestaurant(
        mapId,
        mapCategoryId,
        phoneNumber,
        address,
        name,
        imageUrl,
        linkUrl,
        price,
        latitude,
        longitude
      );
      return response.status(200).json({ message: "Restaurant updated" });
    }
  );

  static updateRestaurantReview = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const { userId, reviewId, content, imageUrl } = request.body;
      if (!userId || !reviewId)
        throwCustomError("Need to send userId or reviewId", 400);
      await mapService.updateRestaurantReview(
        userId,
        reviewId,
        content,
        imageUrl
      );
      return response.status(200).json({ message: "Review updated" });
    }
  );

  static deleteRestaurant = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const { mapId } = request.body;
      if (!mapId) throwCustomError("Need to send mapId", 400);
      await mapService.deleteRestaurant(mapId);
      return response.status(200).json({ message: "deleteRestaurant" });
    }
  );

  static deleteRestaurantReview = asyncErrorHandler(
    async (request: Request, response: Response) => {
      const { reviewId, userId } = request.body;
      if (!reviewId || userId)
        throwCustomError("Need to send reviewId or userId", 400);
      await mapService.deleteRestaurantReview(reviewId, userId);
      return response.status(200).json({ message: "deleteRestaurantReview" });
    }
  );
}

export default mapController;

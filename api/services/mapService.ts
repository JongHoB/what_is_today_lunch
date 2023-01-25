import { throwCustomError } from "../middlewares/error";
import mapDao from "../models/mapDao";

class mapService {
  static createRestaurant = async (
    mapCategoryId: number,
    phoneNumber: string,
    address: string,
    name: string,
    imageUrl: string,
    linkUrl: string,
    price: string,
    latitude: string,
    longitude: string
  ) => {
    //checking if there is a same restaurant
    const result = await mapDao.check(longitude, latitude);
    if (result)
      throwCustomError("There is a same coordinates for the restaurant", 400);
    //create a new restaurant
    return await mapDao.createRestaurant(
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
  };
  static createRestaurantReview = async (
    userId: number,
    content: string,
    mapId: number,
    imageUrl: string
  ) => {
    //checking if there is a restaurant
    const result = await mapDao.check(mapId);
    if (result) throwCustomError("There is no restaurant to write review", 400);
    //create a new restaurant review
    return await mapDao.createRestaurantReview(
      userId,
      content,
      mapId,
      imageUrl
    );
  };
  static getRestaurants = async (categoryId: number) => {
    const result = await mapDao.getRestaurants(categoryId);
    return result;
  };
  static updateRestaurant = async (
    mapId: number,
    mapCategoryId: number,
    phoneNumber: string,
    address: string,
    name: string,
    imageUrl: string,
    linkUrl: string,
    price: string,
    latitude: string,
    longitude: string
  ) => {
    //check if there is a restaurant
    const result = await mapDao.check(mapId);
    if (result) throwCustomError("There is no restaurant to update", 400);

    return await mapDao.updateRestaurant(
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
  };
  static updateRestaurantReview = async (
    userId: number,
    reviewId: number,
    content: string,
    imageUrl: string
  ) => {
    //check if there is a reviewId with userId
    const result = await mapDao.check(userId, reviewId);
    if (result) throwCustomError("There is no review for the user", 400);

    return await mapDao.updateRestaurantReview(
      userId,
      reviewId,
      content,
      imageUrl
    );
  };
  static deleteRestaurant = async (mapId: number) => {
    //check if there is a mapId
    const result = await mapDao.check(mapId);
    if (result) throwCustomError("There is no map", 400);
    return await mapDao.deleteRestaurant(mapId);
  };
  static deleteRestaurantReview = async (reviewId: number, userId: number) => {
    //check if there is a reviewId with userId
    const result = await mapDao.check(userId, reviewId);
    if (result) throwCustomError("There is no review for the user", 400);
    return await mapDao.deleteRestaurantReview(reviewId, userId);
  };
}

export default mapService;

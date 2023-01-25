import myDataSource from "./myDataSource";
import { throwCustomError } from "../middlewares/error";

class mapDao {
  static check = async (first: number | string, second?: number | string) => {
    let query: string;
    switch (typeof second) {
      case "string":
        query = `SELECT * FROM map WHERE map_point='($1,$2)';`;
        break;
      case "number":
        query = `SELECT * FROM review WHERE id=$1 AND user_id=$2;`;
        break;
      case "undefined":
        query = `SELECT * FROM map WHERE id=$1 AND $2;`;
        break;
      default:
        throwCustomError("Invalid data input", 400);
    }

    const [result] = await myDataSource.query(query!, [first, second ?? true]);
    return result;
  };
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
    return myDataSource.query(
      `INSERT INTO 
       map(map_category_id,map_point,phone_number,price,address,name,image_url,link_url)
       VALUES ($1,ST_MakePoint($2,$3),$4,$5,$6,$7,$8,$9);`,
      [
        mapCategoryId,
        longitude,
        latitude,
        phoneNumber,
        price,
        address,
        name,
        imageUrl,
        linkUrl,
      ]
    );
  };
  static createRestaurantReview = async (
    userId: number,
    content: string,
    mapId: number,
    imageUrl: string
  ) => {
    return myDataSource.query(
      `INSERT INTO review(user_id,map_id,content,image_url) VALUES($1,$2,$3,$4);`,
      [userId, mapId, content, imageUrl]
    );
  };
  static getRestaurants = async (categoryId: number) => {
    const whereQuery: string =
      categoryId == 0 ? "" : "WHERE m.map_category_id=$1";

    const result = await myDataSource.query(
      `SELECT 
      mc.name,
      ST_X(m.map_point) as longitude,
      ST_Y(m.map_point) as latitude,
      m.phone_number,
      m.price,
      m.address,
      m.name,
      m.image_url,
      m.link_url,
      json_agg(json_build_object('userId',r.user_id,'content',r.content,'imageUrl',r.image_url,'ratings',r.ratings)) as review
      FROM map as m
      LEFT JOIN map_categories as mc ON m.map_category_id=mc.id
      LEFT JOIN review as r ON r.map_id=m.id
      ${whereQuery}
      GROUP BY mc.name,m.map_point,m.address,m.name,m.image_url,m.link_url,m.phone_number,m.price;
       `,
      [categoryId]
    );
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
    return myDataSource.query(
      `UPDATE map 
         SET map_category_id= IF($1 IS NOT NULL, $1, map_category_id),
             phone_number= IF($2 IS NOT NULL, $2, phone_number),
             address= IF($3 IS NOT NULL, $3, address),
             name= IF ($4 IS NOT NULL, $4, name),
             image_url= IF ($5 IS NOT NULL, $5, image_url),
             link_url= IF ($6 IS NOT NULL, $6, link_url),
             price= IF($7 IS NOT NULL, $7, price),
             coordinates= IF($8 IS NOT NULL, ST_SetX(coordinates,$8),coordinates),
             coordinates= IF($9 IS NOT NULL, ST_SetY(coordinates,$9),coordinates)
         WHERE id=$10;`,
      [
        mapCategoryId,
        phoneNumber,
        address,
        name,
        imageUrl,
        linkUrl,
        price,
        longitude,
        latitude,
        mapId,
      ]
    );
  };
  static updateRestaurantReview = async (
    userId: number,
    reviewId: number,
    content: string,
    imageUrl: string
  ) => {
    return myDataSource.query(
      `UPDATE review 
       SET content = IF($1 IS NOT NULL, $1, content),
           image_url=IF($2 IS NOT NULL, $2 , image_url) 
       WHERE id=$3 AND user_id=$4;`,
      [content, imageUrl, reviewId, userId]
    );
  };
  static deleteRestaurant = async (mapId: number) => {
    return myDataSource.query(`DELETE FROM map WHERE map.id=$1`, [mapId]);
  };
  static deleteRestaurantReview = async (reviewId: number, userId: number) => {
    return myDataSource.query(
      `DELETE FROM review WHERE review.id=$1 AND review.user_id=$2;`,
      [reviewId, userId]
    );
  };
}

export default mapDao;

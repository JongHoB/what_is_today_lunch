import myDataSource from "./myDataSource";
import { throwCustomError } from "../middlewares/error";

class mapDao {
  static check = async (first: number | string, second?: number | string) => {
    let query: string;
    switch (typeof second) {
      case "string":
        query = `SELECT * FROM map WHERE ST_X(map_point)=$1 AND ST_Y(map_point)=$2;`;
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

    const [result] = await myDataSource.query(query!, [
      first,
      second ?? "true",
    ]);
    console.log(result);
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
      categoryId == 0 ? "" : "WHERE m.map_category_id=" + categoryId;

    const result = await myDataSource.query(
      `SELECT 
      m.id,
      mc.name as category_name,
      ST_X(m.map_point) as longitude,
      ST_Y(m.map_point) as latitude,
      m.phone_number,
      m.price,
      m.address,
      m.name,
      m.image_url,
      m.link_url,
      json_agg(json_build_object('reviewId',r.id,'userId',r.user_id,'content',r.content,'imageUrl',r.image_url,'ratings',r.ratings)) as review
      FROM map as m
      LEFT JOIN map_categories as mc ON m.map_category_id=mc.id
      LEFT JOIN review as r ON r.map_id=m.id
      ${whereQuery}
      GROUP BY m.id,mc.name,m.map_point,m.address,m.name,m.image_url,m.link_url,m.phone_number,m.price
      ORDER BY m.id ASC;
       `
    );
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
    return myDataSource.query(
      `UPDATE map 
         SET map_category_id= (CASE WHEN $1::int IS NOT NULL THEN $1
                              ELSE map_category_id
                              END),
             phone_number= (CASE WHEN $2::varchar IS NOT NULL THEN $2
                            ELSE phone_number
                            END),
             address= (CASE WHEN $3::varchar IS NOT NULL THEN $3
                       ELSE address
                      END),
             name= (CASE WHEN $4::varchar IS NOT NULL THEN $4
                    ELSE name
                    END),
             image_url= (CASE WHEN $5::varchar IS NOT NULL THEN $5
                          ELSE image_url
                          END),
             link_url= (CASE WHEN $6::varchar IS NOT NULL THEN $6
                        ELSE link_url
                        END),
             price= (CASE WHEN $7::varchar IS NOT NULL THEN $7
                      ELSE price
                      END),
             map_point= (CASE WHEN $8::double precision IS NOT NULL AND $9::double precision IS NOT NULL THEN ST_MakePoint($8::double precision,$9::double precision)
                            WHEN $8::double precision IS NOT NULL THEN ST_MakePoint($8::double precision,ST_Y(map_point)) 
                            WHEN $9::double precision IS NOT NULL THEN ST_MakePoint(ST_X(map_point),$9::double precision) 
                            ELSE map_point
                            END)
         WHERE id=$10::int;`,
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
       SET content = (CASE WHEN $1:varchar IS NOT NULL THEN $1:varchar
                      ELSE content
                      END),
           image_url=(CASE WHEN $2:varchar IS NOT NULL THEN $2:varchar
                      ELSE image_url
                      END)
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

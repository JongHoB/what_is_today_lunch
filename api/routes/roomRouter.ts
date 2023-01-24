import { Router } from "express";
import roomController from "../controllers/roomController";
const router = Router();

router.get("", roomController.getRoomList);
router.post("/postRoom", roomController.postRoom);
router.get("/info", roomController.getRoomInfo);
router.patch("/orderStatus", roomController.updateOrderStatus);
router.patch("/roomName", roomController.updateRoomName);
router.post("/postUserCount", roomController.postRoomUser);
router.delete("/deleteRoomUser", roomController.deleteRoomUser);
router.patch("/category", roomController.updateCategory);

export default router;

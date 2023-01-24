import { Router } from "express";
import roomController from "../controllers/roomController";
const router = Router();

router.get("", roomController.getRoomList);
router.post("/postRoom", roomController.postRoom);
router.get("/info", roomController.getRoomInfo);
router.patch("/orderStatus", roomController.patchOrderStatus);
router.patch("/roomName", roomController.patchRoomName);
router.post("/postUserCount", roomController.postRoomUser);
router.delete("/deleteRoomUser", roomController.deleteRoomUser);
router.patch("/category", roomController.updateCategory);
export default router;

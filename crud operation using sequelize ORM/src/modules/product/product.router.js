import { Router } from "express";
import * as productController from "./controller/product.js";
const router = Router();
router.get("/getproducts", productController.getProduct);
router.post("/addproduct/:UserId", productController.addProduct);
router.delete("/deleteproduct/:productId", productController.deleteProduct);
router.put("/updateProuct/:productId/:userId", productController.updateProduct);
router.get("/searchforproducts", productController.searchForProductsBiggerThan3000);
router.get("/getAllProductsWithOwners", productController.getAllProductsWithOwners);
router.get("/getproductsaverage", productController.getAverageProductPrice);

export default router;

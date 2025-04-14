import { MainController } from "./MainController";
import { productsService } from "@src/services";

export const productsController = new MainController({
  service: productsService,
});

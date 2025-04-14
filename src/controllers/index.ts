import { MainController } from "./MainController";
import {
  animalsService,
  participantsService,
  productsService,
  videogamesService,
} from "@src/services";

export const animalsController = new MainController({
  service: animalsService,
});
export const participantsController = new MainController({
  service: participantsService,
});
export const productsController = new MainController({
  service: productsService,
});
export const videogamesController = new MainController({
  service: videogamesService,
});

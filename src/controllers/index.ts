import { MainController } from "./MainController";
import {
  animalsService,
  participantsService,
  productsService,
  videogamesService,
} from "@src/services";

export const animalsController = new MainController({
  service: animalsService,
  resourceName: "Animal",
});
export const participantsController = new MainController({
  service: participantsService,
  resourceName: "Participante",
});
export const productsController = new MainController({
  service: productsService,
  resourceName: "Producto",
});
export const videogamesController = new MainController({
  service: videogamesService,
  resourceName: "Videojuego",
});

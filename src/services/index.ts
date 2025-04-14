import animals from "@src/resources/animals.json";
import participants from "@src/resources/participants.json";
import products from "@src/resources/products.json";
import videogames from "@src/resources/videogames.json";
import { MainServiceImpl } from "./MainServiceImpl";
import { ProductsServiceImpl } from "./ProductsServiceImpl";
import { ParticipantsServiceImpl } from "./ParticipantsServiceImpl";

export const animalsService = new MainServiceImpl({
  resources: animals,
});
export const participantsService = new ParticipantsServiceImpl({
  resources: participants,
});
export const productsService = new ProductsServiceImpl({
  resources: products,
});
export const videogamesService = new MainServiceImpl({
  resources: videogames,
});

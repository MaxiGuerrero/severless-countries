import { countryService } from "../service";
import CountryController from "./coutries.controller";

export const countryController = new CountryController(countryService);

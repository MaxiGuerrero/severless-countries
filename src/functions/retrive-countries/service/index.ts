import { http } from "http/index";
import CountryService from "./country.service";

export const countryService = new CountryService(http);

import { http } from "http/index";
import CountryService from "./country.service";
import { cache } from "cache/index";

export const countryService = new CountryService(http, cache);

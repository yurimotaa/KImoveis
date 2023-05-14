import { z } from "zod";
import {
  addressSchema,
  realEstateSchemaRequest,
  realEstateSchemaResponse,
} from "../schemas/realEstates.schemas";

type TAddress = z.infer<typeof addressSchema>;

type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;

type TRealEstateResponse = z.infer<typeof realEstateSchemaResponse>;

export { TRealEstateRequest, TAddress, TRealEstateResponse };

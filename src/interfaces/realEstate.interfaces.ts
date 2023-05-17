import { z } from "zod";
import {
  addressSchema,
  realEstateSchemaRequest,
} from "../schemas/realEstates.schemas";

type TAddress = z.infer<typeof addressSchema>;

type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;

export { TRealEstateRequest, TAddress };

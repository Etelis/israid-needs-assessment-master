import { z } from "zod";
import { name, email, phoneNumber, position } from '../../auth/utils/authValidationSchema';

const validationSchema = z.object({
  name,
  email,
  phoneNumber,
  position,
});

export default validationSchema;
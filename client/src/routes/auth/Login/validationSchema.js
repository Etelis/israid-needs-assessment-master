import { z } from "zod";
import { email } from '../utils/authValidationSchema';

const validationSchema = z.object({
  email: email,
  password: z.string().min(1, "Password is required"),
});

export default validationSchema;
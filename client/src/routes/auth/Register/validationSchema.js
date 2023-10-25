import { z } from "zod";
import { email, password } from '../utils/authValidationSchema';

const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: email,
  password: password,
  position: z.string().min(1, "Position is required"),
  phoneNumber: z.string().refine(
    (value) => phoneNumberPattern.test(value), {
      message: "Phone number must start with a '+' and include the country code."
    }
  ),
});

export default validationSchema;
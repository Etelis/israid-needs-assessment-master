import { password } from '../../utils/authValidationSchema';
import { z } from "zod";

const step2validationSchema = z.object({
  confirmationCode: z.string().min(6, "Must be at least 6 characters"),
  newPassword: password
});

export default step2validationSchema;
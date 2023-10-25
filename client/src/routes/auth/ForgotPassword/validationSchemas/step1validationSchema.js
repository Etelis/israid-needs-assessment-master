import { email } from '../../utils/authValidationSchema';
import { z } from "zod";

const step1validationSchema = z.object({
  email
});

export default step1validationSchema;
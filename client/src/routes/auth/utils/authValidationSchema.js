import { z } from "zod";

export const name = z.string().min(1, "Name is required");

export const email = z
  .string()
  .email("Must be a valid email")
  .min(1, "Email is required");

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine(
    (password) => /[A-Za-z]/.test(password),
    "Must contain at least one letter"
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    "Must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Must contain at least one lowercase letter"
  )
  .refine((password) => /\d/.test(password), "Must contain at least one number")
  .refine(
    (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    "Must contain at least one special character"
  );

const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;

export const phoneNumber = z
  .string()
  .refine((value) => phoneNumberPattern.test(value), {
    message: "Phone number must start with a '+' and include the country code.",
  });

export const position = z.string().min(1, "Position is required");

const authValidationSchema = z.object({
  name,
  email,
  password,
  phoneNumber,
  position,
});

export default authValidationSchema;
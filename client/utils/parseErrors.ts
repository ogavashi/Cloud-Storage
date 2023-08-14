import { ParsedError, ServerError } from "@/types";

export const parseErrors = (errorData: ServerError): ParsedError => {
  const mainMessage = errorData?.message;

  if (mainMessage) {
    return { message: mainMessage as string };
  }

  const parsedErrors = Object.fromEntries(
    Object.entries(errorData).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  return parsedErrors;
};

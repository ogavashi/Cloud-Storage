export type ServerError = { [key in string]: [string] | string | number };

export type ParsedError = { message: string } | { [key in string]: string | number };

export type RegisterErrors = { password?: string; email?: string; fullName?: string };

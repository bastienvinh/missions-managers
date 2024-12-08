export enum RoleEnum {
  GUEST = 'GUEST',
  REDACTOR = 'REDACTOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface SignInError {
  type: 'CredentialsSignin'
  message?: string
}
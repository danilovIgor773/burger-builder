export const FORM_INPUTS_DATA = [
    {
        id: "emailId",
        type: "email",
        placeholder: "E-mail",
        name: "email",
        label: "Your E-mail"
    },
    {
        id: "passwordId",
        type: "password",
        placeholder: "Password",
        name: "password",
        label: "Your password"
    },
];

export const EMAIL_NOT_VALID = "Email not valid";
export const EMAIL_REQUIRED = "Email is required";
export const PASSWORD_NOT_VALID = "Password must be 6 characters or longer";
export const PASSWORD_REQUIRED = "Password is required";

export const getErrorTextByMessage = (message) => {
    const MESSAGES = {
        'EMAIL_EXISTS': 'The email address is already in use by another account.',
        'EMAIL_NOT_FOUND': 'There is no user record corresponding to this identifier. The user may have been deleted.',
        'INVALID_PASSWORD': 'The password is invalid or the user does not have a password.',
        'USER_DISABLED': 'The user account has been disabled by an administrator.',
        'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity. Try again later.',
        'OPERATION_NOT_ALLOWED': 'Password sign-in is disabled for this project.'
    }
    return MESSAGES[message];
}
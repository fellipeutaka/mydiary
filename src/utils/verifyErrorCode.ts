export function verifyErrorCode(code: string) {
  switch (code) {
    case "auth/app-deleted":
      return "Database not found";
    case "auth/expired-action-code":
      return "The action or link code has expired";
    case "auth/invalid-action-code":
      return "The action code is invalid. This can happen if the code is malformed or has already been used";
    case "auth/user-disabled":
      return "The user corresponding to the given credential has been deactivated";
    case "auth/user-not-found":
      return "User does not match any credential";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/email-already-in-use":
      return "An account already exists with the provided email address";
    case "auth/invalid-email":
      return "The email address is not valid";
    case "auth/operation-not-allowed":
      return "The account type corresponding to this credential is not yet activated";
    case "auth/account-exists-with-different-credential":
      return "Email already associated with another account";
    case "auth/auth-domain-config-required":
      return "Configuration for authentication not provided";
    case "auth/credential-already-in-use":
      return "An account already exists for this credential";
    case "auth/operation-not-supported-in-this-environment":
      return "This operation is not supported in the environment being performed. Check if it should be http or https";
    case "auth/timeout":
      return "Response time exceeded. The domain may not be authorized to perform operations";
    case "auth/missing-android-pkg-name":
      return "A package name must be provided for installing the Android app";
    case "auth/missing-continue-uri":
      return "The next URL must be provided in the request";
    case "auth/missing-ios-bundle-id":
      return "A package name for iOS app installation must be provided";
    case "auth/invalid-continue-uri":
      return "The next URL provided in the request is invalid";
    case "auth/unauthorized-continue-uri":
      return "The domain of the next URL is not whitelisted";
    case "auth/invalid-dynamic-link-domain":
      return "The dynamic link domain provided is not authorized or configured in the current project";
    case "auth/argument-error":
      return "Check the link setting for the app";
    case "auth/invalid-persistence-type":
      return "The type specified for data persistence is invalid";
    case "auth/unsupported-persistence-type":
      return "Current environment does not support the specified type for data persistence";
    case "auth/invalid-credential":
      return "The credential has expired or is malformed";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-verification-code":
      return "Credential verification code is not valid";
    case "auth/invalid-verification-id":
      return "Credential verification ID is not valid";
    case "auth/custom-token-mismatch":
      return "The token is different from the requested pattern";
    case "auth/invalid-custom-token":
      return "The token provided is not valid";
    case "auth/captcha-check-failed":
      return "reCAPTCHA response token is not valid, expired, or domain not allowed";
    case "auth/invalid-phone-number":
      return "The phone number is in an invalid format (E.164 standard)";
    case "auth/missing-phone-number":
      return "Phone number is required";
    case "auth/quota-exceeded":
      return "SMS quota has been exceeded";
    case "auth/cancelled-popup-request":
      return "Only one popup window request is allowed at one time";
    case "auth/popup-blocked":
      return "The pop-up window was blocked by the browser";
    case "auth/popup-closed-by-user":
      return "The popup window was closed by the user without completing the login to the provider";
    case "auth/unauthorized-domain":
      return "Application domain is not authorized to perform operations";
    case "auth/invalid-user-token":
      return "The current user has not been identified";
    case "auth/user-token-expired":
      return "Current user token has expired";
    case "auth/null-user":
      return "Current user is null";
    case "auth/app-not-authorized":
      return "Unauthorized application to authenticate with the given key";
    case "auth/invalid-api-key":
      return "The API key provided is invalid";
    case "auth/network-request-failed":
      return "Network connection failure";
    case "auth/requires-recent-login":
      return "User's last login time does not meet security threshold";
    case "auth/too-many-requests":
      return "Requests were blocked due to unusual activity. Please try again after some time";
    case "auth/web-storage-unsupported":
      return "The browser does not support storage or if the user has disabled this feature";
    case "auth/invalid-claims":
      return "Custom lead attributes are invalid";
    case "auth/claims-too-large":
      return "Request size exceeds the maximum allowable size of 1 MB";
    case "auth/id-token-expired":
      return "The token entered has expired";
    case "auth/id-token-revoked":
      return "The token entered has expired";
    case "auth/invalid-argument":
      return "An invalid argument was given to a method";
    case "auth/invalid-creation-time":
      return "Creation time must be a valid UTC date";
    case "auth/invalid-disabled-field":
      return "The property for disabled user is invalid";
    case "auth/invalid-display-name":
      return "Username is invalid";
    case "auth/invalid-email-verified":
      return "The e-mail is invalid";
    case "auth/invalid-hash-algorithm":
      return "HASH algorithm is not cryptography supported";
    case "auth/invalid-hash-block-size":
      return "HASH block size is not valid";
    case "auth/invalid-hash-derived-key-length":
      return "HASH-derived key size is not valid";
    case "auth/invalid-hash-key":
      return "The HASH key must have a valid byte buffer";
    case "auth/invalid-hash-memory-cost":
      return "HASH memory cost is not valid";
    case "auth/invalid-hash-parallelization":
      return "Parallel loading of HASH is not valid";
    case "auth/invalid-hash-rounds":
      return "HASH rounding is not valid";
    case "auth/invalid-hash-salt-separator":
      return "The HASH generation algorithm SALT separator field must be a valid byte buffer";
    case "auth/invalid-id-token":
      return "The token code entered is not valid";
    case "auth/invalid-last-sign-in-time":
      return "Last login time must be a valid UTC date";
    case "auth/invalid-page-token":
      return "The next URL provided in the request is invalid";
    case "auth/invalid-password":
      return "Password is invalid, must be at least 6 characters";
    case "auth/invalid-password-hash":
      return "Password HASH is not valid";
    case "auth/invalid-password-salt":
      return "Password SALT is not valid";
    case "auth/invalid-photo-url":
      return "User Photo URL is invalid";
    case "auth/invalid-provider-id":
      return "Provider identifier is not supported";
    case "auth/invalid-session-cookie-duration":
      return "Session COOKIE duration must be a valid number in milliseconds, between 5 minutes and 2 weeks";
    case "auth/invalid-uid":
      return "The identifier provided must be a maximum of 128 characters";
    case "auth/invalid-user-import":
      return "User record to be imported is not valid";
    case "auth/invalid-provider-data":
      return "The data provider is not valid";
    case "auth/maximum-user-count-exceeded":
      return "The maximum number of users allowed to be imported has been exceeded";
    case "auth/missing-hash-algorithm":
      return "It is necessary to provide the HASH generation algorithm and its parameters to import users";
    case "auth/missing-uid":
      return "An identifier is required for the current operation";
    case "auth/reserved-claims":
      return "One or more custom properties provided used reserved words";
    case "auth/session-cookie-revoked":
      return "Session cookie has expired";
    case "auth/uid-alread-exists":
      return "The given uid is already in use";
    case "auth/email-already-exists":
      return "The email provided is already in use";
    case "auth/phone-number-already-exists":
      return "The phone provided is already in use";
    case "auth/project-not-found":
      return "No projects found";
    case "auth/insufficient-permission":
      return "The credential used does not have permission to access the requested resource";
    case "auth/internal-error":
      return "The authentication server encountered an unexpected error while trying to process the request";
    default:
      return null;
  }
}

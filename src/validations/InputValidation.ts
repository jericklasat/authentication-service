import {Schema} from "express-validator/src/middlewares/schema";

export const UserInput:Schema = {
  emailAddress: {
    isEmail: true,
    normalizeEmail: {
      options: {
        all_lowercase: true
      }
    }
  },
  password: {
    isLength: {
      options: {
        min: 8
      }
    },
    isStrongPassword: {
      errorMessage: 'password is too weak',
    }
  },
  mobileNumber: {
    isLength: {
      options: {
        min: 10,
        max: 11
      }
    }
  },
  firstName: {
    isLength: {
      options: {
        min: 2
      }
    }
  },
  lastName: {
    isLength: {
      options: {
        min: 2
      }
    }},
  gender: {
    isLength: {
      options: {
        min: 1,
        max: 1,
      }
    }},
  dateOfBirth: {
    isDate: {
      options: {
        format: 'YYYY-MM-DD',
        strictMode: true
      }
    }
  },
}

export const LoginInput: Schema = {
  emailAddress: {
    isEmail: true,
    normalizeEmail: {
      options: {
        all_lowercase: true
      }
    }
  },
  password: {
    isLength: {
      options: {
        min: 8
      }
    }
  },
}
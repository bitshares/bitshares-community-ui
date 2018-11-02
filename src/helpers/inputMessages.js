export default {
  userName: {
    title: 'account name',
    validation: {
      required: 'Enter username',
      minLength: 'Must be 4 characters or more',
      isUnique: 'Username already exists',
      hasSpecialSymbol: 'Should contain @, - or number',
      noBadSymbolAtEnd: 'Should not end with @, - or .'
    }
  },
  password: {
    title: 'password',
    validation: {
      required: 'Enter password'
    }
  },
  confirmPassword: {
    title: 'confirm password',
    tip: 'This password can\'t be recovered, write it on paper',
    validation: {
      sameAsPassword: 'Passwords do not match'
    }
  },
  brainkey: {
    title: 'backup phrase',
    tip: 'Enter 16 words backed up when account was created',
    validation: {
      required: 'Enter backup phrase',
      brainkeyValidator: 'Must contain 16 words'
    }
  },
  pin: {
    title: 'create pin code',
    tip: 'PIN code encrypts the private key, stored on this device',
    validation: {
      required: 'Enter PIN',
      minLength: 'PIN must be 6 characters or more'
    }
  },
  confirmPin: {
    title: 'confirm pin code',
    validation: {
      sameAsPin: 'PIN codes do not match'

    }
  }
}

export default {
  userName: {
    title: 'account name',
    validation: {
      required: 'Enter username'

    }
  },
  password: {
    title: 'password',
    validation: {
      required: 'Enter password'

    }
  },
  brainkey: {
    title: 'backup phrase',
    tip: 'Enter 16 words backed up when account was created',
    validation: {
      required: 'Enter backup phrase'
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

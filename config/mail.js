export const config = {
  service: 'gmail',
  auth: {
    user: process.env.NODEJS_GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
}
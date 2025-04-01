
/**
 * Environment Configuration
 * 
 * Load and validate environment variables for the application.
 */
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(5000),
    DATABASE_URL: Joi.string().default('mongodb://localhost:27017/techsphere'),
    JWT_SECRET: Joi.string().default('your-secret-key'),
    JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
    JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
    MAIL_HOST: Joi.string().optional(),
    MAIL_PORT: Joi.number().optional(),
    MAIL_USER: Joi.string().optional(),
    MAIL_PASS: Joi.string().optional(),
    MAIL_FROM: Joi.string().optional(),
    AWS_ACCESS_KEY_ID: Joi.string().optional(),
    AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
    AWS_REGION: Joi.string().optional(),
    AWS_BUCKET_NAME: Joi.string().optional()
  })
  .unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    url: envVars.DATABASE_URL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION,
  },
  email: {
    host: envVars.MAIL_HOST,
    port: envVars.MAIL_PORT,
    secure: envVars.MAIL_PORT === 465,
    user: envVars.MAIL_USER,
    pass: envVars.MAIL_PASS,
    from: envVars.MAIL_FROM
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    region: envVars.AWS_REGION,
    bucketName: envVars.AWS_BUCKET_NAME
  }
};

import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT:process.env.PORT || 3000,
    SECRETS:process.env.SECRETS
}

export default env;
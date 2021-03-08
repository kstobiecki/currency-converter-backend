interface Config {
    logger: {
        level: string;
    };
    currConv: {
        apiKey: string;
        url: string;
    }
}

export const config: Config = {
    logger: {
        level: process.env.APP_LOGGER_LEVEL
    },
    currConv: {
        apiKey: process.env.CURR_CONV_API_KEY,
        url: process.env.CURR_CONV_URL
    }
}
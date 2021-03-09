interface Config {
    logger: {
        level: string;
    };
    exchangeRatesApi: {
        appId: string;
    }
}

export const config: Config = {
    logger: {
        level: process.env.APP_LOGGER_LEVEL
    },
    exchangeRatesApi: {
        appId: process.env.EXCHANGE_RATES_API_APP_ID
    }
}
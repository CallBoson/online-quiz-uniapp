const env = 'dev'

const config = {
    dev: {
        API_PREFIX: 'http://localhost:3000'
    },
    prod: {
        API_PREFIX: 'http://localhost:3000'
    }
}

export default config[env]
const qs = require('qs')

export const Api = {
    baseurl: (headPoint,params) => `${url}/${headPoint}${params ? qs.stringify(params) : ''}`,
}

const url = "https://app.conductorstoolbox.com"

const rp = require('request-promise')
const express = require('express')
const app = express()
const port = 5000

const etcUrl = 'http://etcd:2379/v2/keys/'

async function featureEnabled(name) {
    try {
        const response = await rp({uri: etcUrl + name, json: true})
        return response.node.value == 'yes'
    } catch (ex) {
        return false
    }
}

app.get('/', async (req, res) => {
        const isFeatureEnabled = await featureEnabled('name')
        res.send(`Feature is ${isFeatureEnabled}`)
    }
)

app.listen(port, () => console.log(`Listening on port ${port}!`))

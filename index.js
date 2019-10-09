require('dotenv').config()
const express = require('express')
const app = express()
const port = 8765

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

const axios =  require('axios')
const api = axios.create({
  baseURL: process.env.API_URL
})

const client_id = process.env.CLIENT_ID
const client_secret =  process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI
const auth_url = process.env.AUTH_URL

app.get('/', async (req, res) => {
  res.render('index.html', {
    client_id,
    client_secret,
    redirect_uri,
    auth_url
  })
})

app.get('/authorized', async (req, res) => {
  console.log(req.query)
  const {
    token,
    state
  } = req.query
  if(!token || !state) {
    res.sendStatus(400)
    return
  }
  const auth = await api.post('/oauth/token', {
    authorization_code: token,
    client_id,
    client_secret
  }).catch(err => console.error(err))
  console.log(auth)
  const podcasts = await api.get('/podcasts', {
    headers: {
      Authorization: `Bearer ${auth.data.access_token}`
    }
  }).catch(err => {
    console.error(err)
    res.send('Something went wrong. Check the console.')
  })
  console.log(podcasts.data.collection)
  res.send(`<head></head><body><h1>Success!</h1><div>Here's your podcast list:</div><div><pre>${JSON.stringify(podcasts.data.collection, 2)}</pre></div></body>`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
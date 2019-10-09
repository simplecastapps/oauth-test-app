# OAuth Test App

### Setup

- Copy the `.env.sample` to `.env`
- Set up an ngrok subdomain pointing at port `8765`
- Create a new private app (Account -> Private Apps) in your dashboard using the ngrok subdomain as the app domain
- Set the `client_id` and `client_secret` obtained from the private app you created in the `.env` file
- Set your ngrok subdomain as the redirect URI in the `.env` file


### Authorizing your app

- Navigate to your ngrok domain root
- You should see your client ID and an `authorize` button
- Click the authorize button
- If you are logged in, you'll seen an authorization screen from the auth server
- If you are not logged in, you'll get the login page, which will redirect you to the app auth page on successful login
- Confirm the authorization
- You'll be redirected to this app. You should get a `Success!` message with a JSON representation of your podcasts fetched using the newly-aquired `access_token`

### Confirming in Dashboard

- Refresh the Private Apps screen in your dashboard. You should see an authorization for your personal Private App

_**NOTE**_

_Each time you authorize the app, it will show up again in the authorized apps list. Also, there is no UI currently (and no API endpoint) to remove authorizations_

### Removing Authorizations

Use this SQL query in your local db, using the `client_id` (inside the single quotes) of your created Private App

`UPDATE client_authorizations SET deleted_at = NOW() WHERE client_id = '<CLIENT_ID>' AND deleted_at IS NULL;`
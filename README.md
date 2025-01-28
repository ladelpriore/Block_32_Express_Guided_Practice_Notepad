# Guided Practice - Notepad
Use the barebones API to set up error handling middleware and refactor the existing routes into a separate router.

## Getting Started

1. Create a new repository.
2. Clone down your repository and run `npm install` to install the dependencies.
3. Start the development server with `npm run dev`.
4. Test the requests in `.http`. They should all be working, _except_ for the POST request!

## Adding Middleware

1. Right before `app.listen`, add a catch-all middleware that calls `next` with a status of 404 and the message "Endpoint not found". This will be the default 404 middleware.

2.  Right _after_ your new 404 middleware but _before_ `app.listen`, add a default error-handling middleware. Log the error to the console with `console.error`. The response status should default to 500, unless the error has a status. Similarly, the response message should default to "Sorry, something went wrong!", unless the error has a message.

3.  The handlers for `GET /notes/:id` and `POST /notes` directly send an error response when the request fails. Refactor them to call `next` instead with the corresponding status and message.

4.  Add middleware near the _top_ of the file to parse JSON. The `POST` request in `.http` should now work.

## Refactoring to Router

1. In `api/notes.js`, create a new Express Router and export it.

2. Remove the `notes` import from `server.js`. Import the `notes` array into `api/notes.js` instead.

3. Move the 3 `/notes` middleware from `server.js` into `api/notes.js`. Use the `router` variable instead of `app`, and remove `/notes` from the path of each middleware.

4. In `server.js`, where the `/notes` middleware used to be, add middleware to route `/notes` to the router exported from `api/notes.js`.

5. Test the requests in `.http` to ensure that they all still work.


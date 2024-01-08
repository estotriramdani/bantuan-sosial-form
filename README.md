## Run this project locally

### Development

1. Clone this repository
2. Install dependencies with `yarn`
3. Run the project `yarn dev`
4. Open up your browser and access http://localhost:5173

### Production

1. Clone this repository
2. Install dependencies with `yarn`
3. Run the project `yarn build`
4. You can now deploy the `dist` folder to your server

## Available Routes

### `/`

This routes contains form to create.

### `/submissions`

This routes contains list of submissions from the form in `/`.

## About Storage

You will notice that the submissions will be available in `/submissions`. In this project, we are using browser `localStorage` to store submitted form. For images, it converted to `base64` string before being stored to `localStorage`. To retrieve the data, we are using React hooks to handle that located at `/src/hooks/useSubmissions.ts`

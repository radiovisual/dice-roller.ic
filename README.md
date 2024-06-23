<img width="80" src="media/dice-roller-logo.png" alt="Dice roller logo">

## dice-roller.ic

> Roll some cool virtual dice in this web application powered by the <a href="https://internetcomputer.org">Internet Computer</a> 🎲

## Installation

If you want to develop locally you need to install the dependencies first:

```
npm install
```

## Development

Make sure you have [installed the dependencies](#installation) and then run this command to start developing locally:

```
npm run dev
```

Then open up the browser url that is diplayed in the terminal, for example: [http://localhost:5173/](http://localhost:5173/)

## Deployment

Make sure you have the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed.

Start the local replica with the DFX command:

```
dfx start --background
```

When the local replica is up and running, run this command to deploy the canisters:

```
dfx deploy
```

---

🎲 ❤️

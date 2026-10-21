# FirstContro

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

FirstContro helps developers, especially beginners, find their first open source contribution. It searches GitHub for issues labeled `good first issue` and lets you filter them by programming language.

**Live demo:** [https://first-contro.vercel.app](https://first-contro.vercel.app/)

## Features

- Search GitHub for beginner-friendly issues
- Filter issues by programming language
- View repository stars and other details

## Tech Stack

- [Next.js](https://nextjs.org/) 15 and [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [NextAuth.js](https://next-auth.js.org/) with [Prisma](https://www.prisma.io/)
- [Axios](https://axios-http.com/) for requests to the [GitHub REST API](https://docs.github.com/en/rest)

## Getting Started

### Prerequisites

- Node.js and npm
- A database supported by Prisma
- A GitHub OAuth app (client ID and secret)
- A GitHub personal access token

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/HmadAfzal/first-contro.git
   cd first-contro
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env.local` file in the project root:

```env
   DATABASE_URL="your-database-url"
   GITHUB_ID="your-github-oauth-client-id"
   GITHUB_SECRET="your-github-oauth-client-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   GITHUB_TOKEN="Bearer your-github-personal-access-token"
```

   Keep the `Bearer ` prefix in `GITHUB_TOKEN`. You can create a token [here](https://github.com/settings/tokens?type=classic). Only the `public_repo` scope is needed.

4. Set up the database:

```bash
   npx prisma migrate deploy
   npx prisma generate
```

5. Start the development server:

```bash
   npm run dev
```

The app runs at http://localhost:3000.

## Scripts

| Command         | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `npm run dev`   | Start the development server                                           |
| `npm run build` | Run Prisma migrations, generate the Prisma client, and build the app   |
| `npm start`     | Start the production server                                            |
| `npm run lint`  | Run ESLint                                                             |

## Project Structure

```
app/          Next.js app routes
components/   UI components
constants/    Shared constants
lib/          Helpers and utilities
prisma/       Prisma schema and migrations
public/       Static assets
types/        TypeScript types
```

## Contributing

Contributions are welcome, including bug reports, feature ideas, UI improvements, and refactors.

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push the branch: `git push origin feature/my-new-feature`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

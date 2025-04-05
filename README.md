[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)


# FirstContro

**FirstContro** is a web app built to help developers — especially **beginners** — make their first open source contribution.  
The app finds **beginner-friendly GitHub issues** labeled with `good first issue` and allows users to filter by programming language.

Contributing to open source can feel overwhelming when you start — this app aims to make that first step easier.

🔗 **Live Demo:** [Click Here](https://firstcontro.hmad.codes/)  

---

## Features

- 🔎 Search for beginner-friendly issues across GitHub
- 🛠️ Filter by programming language
- ⭐ View repository stars and other helpful details
- 🚀 Open source — your first contribution can start here!
- ⚡ Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Axios**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HmadAfzal/first-contro
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add:

```bash
DATABASE_URL="your-database-url"
GITHUB_ID="github-client-id"
GITHUB_SECRET="github-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
GITHUB_TOKEN='Bearer ${your personal github token here (keep Bearer as it is)}'
```

You can generate a GitHub token [here](https://github.com/settings/tokens?type=classic) (only `public_repo` access is needed).

### 4. Run the development server

```bash
npm run dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

---

## Contributing

Feel free to contribute! 🎉  
You can:

- Report bugs 🐛
- Suggest new features ✨
- Improve the UI 🎨
- Refactor code 🧹

### To contribute:

1. Fork the repository
2. Create your branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Open a Pull Request 🚀

**No contribution is too small!**  

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [GitHub API](https://docs.github.com/en/rest)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgements

Thanks to the amazing open source community for making tech more accessible for everyone!  
Special thanks to all first-time contributors giving open source a try! ❤️

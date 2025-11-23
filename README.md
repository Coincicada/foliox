# Foliox

Auto-generate beautiful developer portfolios from GitHub profiles with AI-powered summaries using Next.js, Vercel AI SDK, and Groq.

## ✨ Features

- **Modern Portfolio Templates**: Beautiful, responsive designs with dark mode
- **AI-Powered Content**: Automatic generation of professional summaries and highlights
- **GitHub Integration**: Fetch profile, projects, and contribution graphs
- **Instant Generation**: Smart caching for lightning-fast portfolios
- **SEO Optimized**: Dynamic metadata for better discoverability
- **LinkedIn Integration**: Fetch LinkedIn profile data
- **Fully Responsive**: Works perfectly on all devices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000` and enter a GitHub username to generate a portfolio!

## 🎯 How It Works

1. **Enter Username**: Visit the landing page and enter any GitHub username
2. **AI Generation**: Our AI analyzes the profile and generates professional content
3. **Beautiful Portfolio**: Get a fully-featured portfolio with projects, skills, and more
4. **Share**: Share your portfolio with a single click

## 📁 Project Structure

```
foliox/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── portfolio/[username]/       # Dynamic portfolio pages
│   └── api/                        # API endpoints
├── components/
│   ├── ui/                         # Reusable UI components
│   └── portfolio/                  # Portfolio sections
├── lib/
│   ├── modules/                    # Core functionality
│   └── utils/                      # Utilities
└── types/                          # TypeScript definitions
```

## 🔧 Environment Variables

Create `.env.local`:

```env
# Required
GROQ_API_KEY=your_groq_api_key
API_KEYS=key1,key2,key3

# Optional
GITHUB_TOKEN=your_github_token
CACHE_ENABLED=true
DEFAULT_CACHE_TTL=3600
DEBUG=false

# Public
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📚 API Endpoints

- `GET /api/user/[username]/profile` - GitHub profile with AI-generated bio
- `GET /api/user/[username]/projects` - Featured projects and languages
- `GET /api/user/[username]/about` - About section with highlights
- `GET /api/linkedin/[username]` - LinkedIn profile data

All endpoints require `X-API-Key` header (except when `DEBUG=true`).

## 🎨 Portfolio Components

- **Hero Section**: Profile picture, bio, social links, and skills
- **About Section**: AI-generated summary and key highlights
- **Projects Section**: Featured repositories with stats and topics
- **Contribution Graph**: GitHub activity visualization
- **Experience Section**: Work history and education (optional)

## 📖 Documentation

- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Detailed architecture and API docs
- [PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md) - Portfolio system guide and customization

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: Tailwind CSS + Shadcn/ui
- **AI**: Vercel AI SDK with Groq (Llama 3.1 8B)
- **API**: GitHub GraphQL API
- **Caching**: Next.js unstable_cache
- **Type Safety**: TypeScript

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

Set environment variables in Vercel dashboard.

### Docker

```bash
docker build -t foliox .
docker run -p 3000:3000 foliox
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Groq](https://groq.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

# 🚀 DevShelf

**Showcase Your GitHub Projects Beautifully & Embed Them Anywhere**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nishant-codess/DevShelf)
[![GitHub stars](https://img.shields.io/github/stars/Nishant-codess/DevShelf?style=social)](https://github.com/Nishant-codess/DevShelf)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Live Demo

🌐 **Live Site**: [https://devshelf-nishant.vercel.app](https://devshelf-nishant.vercel.app)

## 🎯 What is DevShelf?

DevShelf is a modern, embeddable GitHub project showcase platform that allows developers to:

- **🔄 Sync with GitHub**: Automatically fetch your public repositories
- **🎨 Beautiful Showcases**: Create stunning project portfolios
- **🌐 Embed Anywhere**: Add your showcase to any website with a simple widget
- **📱 Responsive Design**: Works perfectly on all devices
- **🎭 Dark/Light Themes**: Automatically adapts to your website's theme

## 🚀 Quick Start

### 1. Create Your Showcase

1. Visit [DevShelf](https://devshelf-nishant.vercel.app)
2. Login with your GitHub account
3. Select your favorite repositories
4. Generate your unique showcase

### 2. Embed on Your Website

Add this code to any website:

```html
<script src="https://devshelf-nishant.vercel.app/widget.js"></script>
<div class="devshelf-widget" data-showcase-id="YOUR_SHOWCASE_ID"></div>
```

### 3. Share Your Projects

Your showcase is now live and embeddable on any website! 🎉

## 🛠️ How It Works

### 🔐 GitHub Integration
- **OAuth Authentication**: Secure GitHub login
- **Repository Fetching**: Automatically syncs your public repos
- **Real-time Data**: Live stars, forks, and activity

### 🎨 Showcase Creation
- **Repository Selection**: Choose your best projects
- **Custom Branding**: DevShelf branding included
- **Image Export**: Download showcase as image (Coming Soon)

### 🌐 Widget System
- **Cross-domain Embedding**: Works on any website
- **Responsive Design**: Adapts to any screen size
- **Theme Adaptation**: Matches your website's theme

## 🎨 Features

### ✨ Core Features
- **GitHub OAuth Integration**
- **Repository Showcase**
- **Embeddable Widget**
- **Responsive Design**
- **Dark/Light Theme Support**
- **Real-time GitHub Stats**

### 🚀 Advanced Features
- **Multi-repository Selection**
- **Custom Showcase URLs**
- **Cross-domain Embedding**
- **Automatic Theme Detection**
- **Performance Optimized**

### 📱 Mobile-First Design
- **Responsive Grid Layout**
- **Touch-friendly Interface**
- **Fast Loading Times**
- **Progressive Web App Ready**

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Server-side logic
- **GitHub API** - Repository data
- **OAuth 2.0** - Authentication

### Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nishant-codess/DevShelf.git
   cd DevShelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your GitHub OAuth credentials:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REDIRECT_URI=http://localhost:3000/auth/callback
   NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/auth/callback
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the callback URL to your domain
4. Add the credentials to your environment variables

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | Yes |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | Yes |
| `GITHUB_REDIRECT_URI` | OAuth callback URL | Yes |
| `NEXT_PUBLIC_GITHUB_REDIRECT_URI` | Public callback URL | Yes |

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your repository**
   - Push your code to GitHub
   - Connect to Vercel

2. **Set environment variables**
   - Add your GitHub OAuth credentials
   - Update redirect URIs

3. **Deploy**
   - Vercel will automatically deploy your app

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📊 API Reference

### Showcase API

#### Get Showcase Data
```http
GET /api/showcase/[id]
```

#### Create Showcase
```http
POST /api/showcase/[id]
Content-Type: application/json

{
  "user": {...},
  "repositories": [...],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Widget API

The widget automatically fetches showcase data and renders it with:
- **Automatic styling**
- **Responsive design**
- **Theme adaptation**

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Bugs
- Use the [GitHub Issues](https://github.com/Nishant-codess/DevShelf/issues) page
- Include detailed reproduction steps

### 💡 Suggest Features
- Open a feature request issue
- Describe the use case and benefits

### 🔧 Submit Code
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### 📝 Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Add JSDoc comments for functions

## 🗺️ Roadmap

### 🚀 Upcoming Features
- **📸 Image Export**: Download showcase as image with DevShelf branding
- **🎨 Custom Themes**: User-defined color schemes
- **📊 Analytics**: Track showcase views and interactions
- **🔗 Custom Domains**: Use your own domain for showcases
- **📱 Mobile App**: Native mobile application

### 🔮 Future Enhancements
- **💾 Database Integration**: Persistent showcase storage
- **🔐 Private Showcases**: Password-protected showcases
- **📈 Advanced Analytics**: Detailed performance metrics
- **🎯 SEO Optimization**: Better search engine visibility
- **🌍 Multi-language Support**: Internationalization
- **🤖 AI-powered Suggestions**: Smart repository recommendations

### 🛡️ Robust Showcase System
- **🔒 Enhanced Security**: Advanced authentication options
- **📊 Performance Monitoring**: Real-time performance tracking
- **🔄 Auto-sync**: Automatic repository updates
- **🎨 Advanced Customization**: More branding options
- **📱 Progressive Web App**: Offline functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub API** for repository data
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Support

### 📚 Documentation
- [API Reference](#api-reference)
- [Deployment Guide](#deployment)
- [Configuration](#configuration)

### 🆘 Help Center
- [FAQ](https://github.com/Nishant-codess/DevShelf/issues)
- [Troubleshooting Guide](https://github.com/Nishant-codess/DevShelf/wiki)

### 📧 Contact Us
- **Email**: nishant.ranjan.air1@gmail.com
- **GitHub**: [@Nishant-codess](https://github.com/Nishant-codess)
- **LinkedIn**: [Nishant Ranjan](https://www.linkedin.com/in/nishant-ranjan-srmist/)

### 🔗 Quick Links
- [Home](https://devshelf-nishant.vercel.app)
- [Dashboard](https://devshelf-nishant.vercel.app/dashboard)
- [Showcase](https://devshelf-nishant.vercel.app/showcase)
- [About](https://devshelf-nishant.vercel.app/about)

### 📋 Legal
- [Terms of Service](https://devshelf-nishant.vercel.app/terms)
- [Privacy Policy](https://devshelf-nishant.vercel.app/privacy)
- [Status](https://devshelf-nishant.vercel.app/status)

---

<div align="center">

**Made with ❤️ by [Nishant Ranjan](https://github.com/Nishant-codess)**

[![GitHub](https://img.shields.io/badge/GitHub-@Nishant--codess-black?style=flat&logo=github)](https://github.com/Nishant-codess)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nishant%20Ranjan-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/nishant-ranjan-srmist/)

</div>

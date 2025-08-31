# DevShelf 🚀

A beautiful, interactive project showcase platform for GitHub repositories with gamification and AI-powered explanations.

## ✨ Features

### 🎨 **Modern, Animated UI**
- **Framer Motion animations** throughout the interface
- **tsParticles animated background** with twinkling stars and floating particles
- **Glassmorphism effects** and smooth transitions
- **Responsive design** that works on all devices

### 🌙 **Theme System**
- **Dark/Light mode toggle** with smooth transitions
- **Custom color palette** with neon accents
- **Persistent theme preference** using local storage
- **System preference detection** on first visit

### 🏆 **Gamification System**
- **Badges** awarded based on repository stats (stars, forks, activity)
- **Trophies** with different rarity levels (common, rare, epic, legendary)
- **Achievement tracking** and unlock notifications
- **Progress indicators** for upcoming achievements

### 🤖 **AI Chatbot (Prototype)**
- **Floating chat bubble** accessible from any page
- **Mock AI responses** about projects and technologies
- **Animated typing indicators** and smooth chat transitions
- **Context-aware suggestions** based on repository content

### 📱 **Core Functionality**
- **Repository showcase** with beautiful project cards
- **Search and filtering** by language, stars, forks, etc.
- **Repository management** dashboard for users
- **Cover image upload** support (placeholder for Firebase/Supabase)
- **Featured/Hidden repository** toggles

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Particles**: tsParticles
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Context + Hooks
- **Authentication**: NextAuth.js (GitHub OAuth - ready for implementation)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devshelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
devshelf/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/         # User dashboard page
│   │   ├── project/[id]/      # Project details page
│   │   ├── u/[username]/      # User showcase page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── AIChatbot.tsx      # AI chatbot component
│   │   ├── Footer.tsx         # Footer component
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── ParticlesBackground.tsx # Animated background
│   │   └── ProjectCard.tsx    # Repository card component
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Theme management
│   ├── data/                  # Sample data
│   │   └── sampleRepos.ts     # Mock repository data
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript definitions
│       └── index.ts           # Type interfaces
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Key Components

### **Navbar**
- Responsive navigation with mobile menu
- Theme toggle button
- GitHub login button (ready for OAuth)
- Glassmorphism effect with backdrop blur

### **ProjectCard**
- Interactive repository cards with hover animations
- Badge system based on repository stats
- Responsive grid layout
- Action buttons for viewing details and GitHub

### **ParticlesBackground**
- Animated starry background using tsParticles
- Interactive particles that respond to hover/click
- Configurable particle density and colors
- Performance optimized with slim bundle

### **AIChatbot**
- Floating chat interface accessible from any page
- Mock AI responses for demonstration
- Animated typing indicators
- Smooth open/close transitions

## 🎨 Design System

### **Color Palette**
- **Dark Mode**: Deep navy (#0A0F1C) with neon accents
- **Light Mode**: Clean whites and grays
- **Accent Colors**: Neon blue (#38BDF8), purple (#8B5CF6), teal (#14B8A6)

### **Animations**
- **Fade In**: Smooth opacity transitions
- **Slide Up**: Content slides in from bottom
- **Scale**: Interactive hover effects
- **Glow**: Neon accent animations
- **Float**: Subtle floating elements
- **Twinkle**: Particle animations

### **Typography**
- **Primary**: Geist Sans (modern, clean)
- **Monospace**: Geist Mono (for code)
- **Responsive**: Scales appropriately on all devices

## 🔧 Configuration

### **Tailwind CSS**
Custom animations and color schemes are defined in `tailwind.config.ts`:

```typescript
animation: {
  "fade-in": "fadeIn 0.5s ease-in-out",
  "slide-up": "slideUp 0.3s ease-out",
  "scale-in": "scaleIn 0.2s ease-out",
  "glow": "glow 2s ease-in-out infinite alternate",
  "float": "float 6s ease-in-out infinite",
  "twinkle": "twinkle 1.5s ease-in-out infinite",
}
```

### **tsParticles**
Particle system configuration in `ParticlesBackground.tsx`:

```typescript
particles: {
  color: { value: ['#38BDF8', '#8B5CF6', '#14B8A6'] },
  links: { color: '#38BDF8', distance: 150, enable: true },
  move: { enable: true, speed: 1 },
  twinkle: { particles: { enable: true, frequency: 0.05 } }
}
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### **Netlify**
1. Build the project: `npm run build`
2. Deploy the `out` directory
3. Configure build settings in Netlify dashboard

### **Environment Variables**
For production, you'll need to set up:
- GitHub OAuth credentials
- Database connection (if implementing backend)
- Image storage (Firebase/Supabase)

## 🔮 Future Enhancements

### **Phase 2: Backend Integration**
- [ ] GitHub OAuth authentication
- [ ] Real-time repository data fetching
- [ ] User profile management
- [ ] Cover image upload to cloud storage

### **Phase 3: Advanced Features**
- [ ] Real AI integration for project explanations
- [ ] Social features (likes, comments, sharing)
- [ ] Analytics dashboard
- [ ] Custom domain support

### **Phase 4: Enterprise Features**
- [ ] Team collaboration tools
- [ ] Advanced analytics and insights
- [ ] API for third-party integrations
- [ ] White-label solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Framer Motion** for smooth animations
- **tsParticles** for the interactive background
- **Tailwind CSS** for the utility-first styling
- **Lucide** for the beautiful icons

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/devshelf/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/devshelf/discussions)
- **Email**: contact@devshelf.com

---

**DevShelf** - Showcase your GitHub projects like never before! 🚀✨

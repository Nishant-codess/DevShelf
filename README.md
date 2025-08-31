# 🚀 DevShelf - GitHub Project Showcase Widget

DevShelf is a modern platform that allows developers to create beautiful, embeddable project showcases from their GitHub repositories. Embed your portfolio on any website with just two lines of code!

## ✨ Features

- **🔗 Easy Embedding**: Add your showcase to any website with a simple script tag
- **🎨 Beautiful Design**: Modern, responsive design that looks great everywhere
- **📱 Mobile Friendly**: Fully responsive design that works on all devices
- **🔄 Real-time Data**: Always shows the latest GitHub stats and information
- **⚡ Fast Loading**: Optimized for performance with minimal impact on your website
- **🎯 Customizable**: Easy to style and customize to match your website's theme

## 🚀 Quick Start

### 1. Create Your Showcase

1. Visit [DevShelf](https://devshelf-nishant.vercel.app)
2. Login with your GitHub account
3. Select the repositories you want to showcase
4. Click "Create Showcase"

### 2. Embed on Your Website

Copy the embed code provided and paste it into your website:

```html
<script src="https://devshelf-nishant.vercel.app/widget.js"></script>
<div class="devshelf-widget" data-showcase-id="YOUR_SHOWCASE_ID"></div>
```

Replace `YOUR_SHOWCASE_ID` with your actual showcase ID (e.g., "username-1234567890").

## 📋 How It Works

The DevShelf widget system consists of:

1. **Widget Script** (`/widget.js`): A lightweight JavaScript file that loads and renders your showcase
2. **API Endpoint** (`/api/showcase/[id]`): Serves showcase data publicly
3. **Showcase Storage**: Your showcase data is stored securely and accessible via unique URLs

## 🎯 Live Demo

Check out the [widget demo](https://devshelf-nishant.vercel.app/demo.html) to see how it works!

## 🔧 Customization

### Basic Styling

The widget automatically adapts to your website's styling. You can also customize it with CSS:

```css
/* Customize widget appearance */
.devshelf-widget-container {
    max-width: 800px; /* Adjust width */
    margin: 0 auto; /* Center the widget */
}

.devshelf-showcase {
    border-radius: 16px; /* Rounder corners */
    box-shadow: 0 8px 25px rgba(0,0,0,0.15); /* Custom shadow */
}
```

### Responsive Design

The widget is fully responsive and will look great on:
- Desktop computers
- Tablets
- Mobile phones
- Any screen size

## 📈 Benefits

- **Professional Portfolio**: Showcase your best projects on your personal website
- **Easy Updates**: Update your showcase once, it updates everywhere
- **No Maintenance**: No need to manually update project cards
- **Real-time Data**: Always shows the latest GitHub stats
- **Cross-platform**: Works on any website, blog, or portfolio

## 🛠️ Technical Details

### Widget Script Features

- **Lightweight**: Only ~15KB minified
- **No Dependencies**: Pure vanilla JavaScript
- **Cross-browser**: Works in all modern browsers
- **Error Handling**: Graceful fallbacks for network issues
- **Dynamic Loading**: Automatically detects new widgets on the page

### API Endpoints

- `GET /api/showcase/[id]`: Retrieve showcase data
- `POST /api/showcase/[id]`: Store showcase data

### Data Structure

```typescript
interface ShowcaseData {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  repositories: Array<{
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
  }>;
  createdAt: string;
}
```

## 🌟 Examples

### Personal Portfolio
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
</head>
<body>
    <h1>Welcome to My Portfolio</h1>
    <p>Check out my latest projects:</p>
    
    <script src="https://devshelf-nishant.vercel.app/widget.js"></script>
    <div class="devshelf-widget" data-showcase-id="yourusername-1234567890"></div>
</body>
</html>
```

### Blog Post
```html
<article>
    <h1>My Latest Projects</h1>
    <p>Here are some of the projects I've been working on recently:</p>
    
    <script src="https://devshelf-nishant.vercel.app/widget.js"></script>
    <div class="devshelf-widget" data-showcase-id="yourusername-1234567890"></div>
</article>
```

## 🔒 Privacy & Security

- **Public Data Only**: Only public GitHub repositories are displayed
- **No Personal Data**: No sensitive information is stored or transmitted
- **Secure API**: All API calls use HTTPS
- **Rate Limiting**: API requests are rate-limited to prevent abuse

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you need help or have questions:

1. Check the [demo page](https://devshelf-nishant.vercel.app/demo.html)
2. Visit the main [DevShelf website](https://devshelf-nishant.vercel.app)
3. Create an issue on GitHub

---

**Made with ❤️ by the DevShelf team**

# Career Courssting Dashboard

A modern, responsive career development platform built with React, TypeScript, and Tailwind CSS. This dashboard provides comprehensive career guidance, skill development tracking, mentorship opportunities, and job marketplace integration.

## 🚀 Features

### Core Functionality
- **Authentication System** - Secure sign up and sign in with user management
- **Dashboard Overview** - Personalized career insights and progress tracking
- **Career Exploration** - AI-powered career recommendations and guidance
- **Skill Development** - Interactive learning modules and progress tracking
- **Mentorship Program** - Connect with industry professionals and mentors
- **Job Marketplace** - Browse and apply for relevant career opportunities
- **Profile Management** - Comprehensive user profile and settings
- **Assessments & Resources** - Career assessments and learning resources

### UI/UX Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme** - Toggle between dark and light themes across all pages
- **Modern Interface** - Clean, professional design with smooth animations
- **Interactive Components** - Engaging user experience with hover effects and transitions
- **Consistent Design** - White and orange color scheme for light theme, dark blue and orange for dark theme

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API (for theme management)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react_dashboard_ui_clone_project_o2xhnc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎨 Theme System

The application supports both light and dark themes with a toggle switch in the navigation bar. The theme preference is persisted in localStorage.

### Theme Colors
- **Dark Theme**: `#1a2035` background with orange accents
- **Light Theme**: Clean white background with orange accents

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Achievements.jsx
│   ├── CareerRecommendations.jsx
│   ├── Header.tsx
│   ├── Navbar.jsx
│   ├── SkillProgress.jsx
│   ├── ThemeToggle.tsx
│   └── UpcomingLearningModules.jsx
├── contexts/            # React contexts (theme management)
│   └── ThemeContext.tsx
├── pages/              # Main application pages
│   ├── SignInPage.tsx
│   └── SignUpPage.tsx
├── types/              # TypeScript type definitions
│   └── auth.ts
├── AuthLayout.tsx      # Authentication layout component
├── SignInForm.tsx      # Sign in form component
├── SignUpForm.tsx      # Sign up form component
├── auth.css           # Authentication styles
├── Dashboard.jsx
├── CareerExploration.jsx
├── SkillDevelopment.jsx
├── Mentorship.jsx
├── JobMarketplace.jsx
├── ProfileSettings.jsx
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Dashboard
The main landing page featuring:
- Personalized greeting with user avatar
- Career recommendations
- Skill progress tracking
- Upcoming learning modules
- Achievement showcase

### Navigation
- Responsive navigation bar
- Theme toggle switch
- Quick access to all major sections
- User profile and notifications

### Career Features
- **Career Exploration**: AI-powered career path recommendations
- **Skill Development**: Interactive learning modules with progress tracking
- **Mentorship**: Connect with industry professionals
- **Job Marketplace**: Browse and apply for opportunities

## 🎨 Customization

### Adding New Themes
1. Update the theme context with new color schemes
2. Add theme-specific CSS classes
3. Update the theme toggle component

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color palette
- Maintain consistent spacing and typography
- Ensure accessibility compliance

## 🔧 Development

### Code Style
- ESLint configuration for code quality
- TypeScript for type safety
- Component-based architecture
- Responsive design principles

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

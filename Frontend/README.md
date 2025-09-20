# Career Counselling Dashboard

A modern, responsive career development platform built with React, TypeScript, and Tailwind CSS. This dashboard provides comprehensive career guidance, skill development tracking, mentorship opportunities, a job marketplace, and a conversational onboarding experience for personalization.

## 🚀 Features

### Core Functionality
- **Authentication System** - Sign up and sign in with user management (redirect to auth if not signed in)
- **Dashboard Overview** - Personalized career insights and progress tracking
- **Career Exploration** - AI-powered career recommendations and guidance
- **Skill Development** - Interactive learning modules and progress tracking
- **Mentorship Program** - Connect with industry professionals and mentors
- **Job Marketplace** - Browse and apply for relevant career opportunities
- **Profile Management** - Comprehensive user profile and settings
- **Assessments & Resources** - Career assessments and learning resources
- **Conversational Onboarding** - Chat-style flow at `/onboarding` to collect essential user details

### UI/UX Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light/System Theme** - Theme toggle with System option, persisted in localStorage
- **Modern Interface** - Glassmorphism cards, soft shadows, and refined motion
- **Gradient System** - Reusable gradient utilities:
  - `text-gradient` for headings and brand
  - `btn-image-flow` for CTAs (orange → pink flow)
  - `outline-gradient` for inputs (used in Onboarding)
  - `nav-gradient` with animated top flow bar
- **Consistent Design** - Pure black dark background with high-contrast glass cards; clean light theme

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

5. **First-run redirect**
   - If you are not authenticated, opening `/` will redirect you to `/signin`.
   - After successful sign up, you are redirected to `/onboarding` to complete profile personalization.

## 🎨 Theme & Visual System

The application supports Light, Dark, and System themes with a dropdown in the navbar/auth header. The preference is persisted in localStorage and follows OS changes when System is selected.

### Theme Colors
- **Dark Theme**: pure black background `#000000` with translucent glass cards
- **Light Theme**: bright backdrop with soft glass and gradient accents

Theme toggle is available in the navbar, auth header (Sign In/Up), and the onboarding page header.

## 🔐 Authentication & Demo Account

- Sign in: `/signin`
- Sign up: `/signup` (redirects to `/onboarding` after success)
- Demo credentials for testing:
  - Email: `demo@counselling.app`
  - Password: `Demo@123`

When authenticated, `/` shows the dashboard; otherwise it redirects to `/signin`.

### Redirect Logic
- Protected routes require `localStorage.isAuthenticated === 'true'`
- Visiting `/signin` or `/signup` while authenticated redirects to `/`
- Logout navigates to `/signin` and prevents back navigation

## 🗣️ Conversational Onboarding (Personalization)

Route: `/onboarding`

The chat asks for:
- Required:
  - Age
  - Grade / Education level
  - Location (City, State)
  - Language preference
  - Academic stream / Area of study
  - Interests & aspirations (checkbox grid + “Others”, min 3)
  - Preferred work style / environment
  - Consent for data usage (type "I agree")
- Optional (skippable by submitting empty input):
  - Current skills / certifications / achievements
  - Resume or academic record link
  - Career goals
  - Notification preferences

On completion, onboarding data is saved to `localStorage` and merged into the `user` profile, then the app shows a Next button to go to the dashboard.

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
│   └── OnboardingChat.tsx
├── types/              # TypeScript type definitions
│   └── auth.ts
├── AuthLayout.tsx      # Authentication layout component
├── SignInForm.tsx      # Sign in form component
├── SignUpForm.tsx      # Sign up form component
├── auth.css           # Authentication styles
├── Dashboard.jsx            # Landing page after auth
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

### Navigation & Redirects
- Gradient navbar (`nav-gradient`) with animated top flow bar
- Theme dropdown (Light/Dark/System)
- Auth header on Sign In/Up mirrors the dashboard navbar styling
- `/` redirects to `/signin` when not authenticated

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
- Prefer Tailwind utilities; custom utilities live in `index.css`
- Reuse gradient helpers: `text-gradient`, `btn-image-flow`, `outline-gradient`, `nav-gradient`
- Maintain consistent spacing and typography; ensure accessible contrast

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

[![i-Phone-16-pro-mockup-on-the-bench-isometric.jpg](https://i.postimg.cc/1zC7XVy0/i-Phone-16-pro-mockup-on-the-bench-isometric.jpg)](https://postimg.cc/WDZwf3Ft)


# BridgeHub

BridgeHub is a modern web application designed to facilitate collaboration between developers, UI/UX designers, data professionals and other tech related enthusiastics.

## Technologies Used

### Core Technologies

- **React** v18.2.0
  
- **React Router DOM** v6.22.3
  
- **Zod** v3.24.1
  
- **Supabase Authentication & Database** (Client v2.39.7)
  

### UI Components & Styling

- **Radix UI** (components)
  
- **Shadcn UI** (components)
  
- **Lucide React** (Icons)
  
- **TailwindCSS** and Tailwind Animations
  
- **Class Variance Authority** (**cva**)
  
- **clsx**
  
- **Tailwind Merge** (tw-merge)
  

### Internationalization

- **react-18n** v8.0.2
  
- **i18n Browser Language Detector** v14.1.0
  

### Development Tools

- **ESLint v8.57.0** (Linter)
  
- **Tailwind CSS** v3.4.1 (Styling)
  
- **Vite** v5.1.6
  

## Project Structure

```
├── src/

│ ├── components/ # Reusable UI components

│ ├── contexts/ # React context providers

│ ├── hooks/ # Custom React hooks

│ ├── i18n/ # Internationalization setup

│ ├── layout/ # Layout components

│ ├── lib/ # Utility functions and constants

│ ├── pages/ # Application pages/routes

│ └── services/ # External service integrations

├── public/ # Static assets

└── config files # Various configuration files
```

## Features

- Authentication system using Supabase

- Multi-language support

- User profile customization + social links (GitHub, Discord and LinkedIn)

- Create a project post

- Apply to an already created group project

- Reject user's applications

- Filter projects by technology/position

- Project management capabilities

## Getting Started

1. Clone the repository
  
2. Install dependencies:
  

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
  
- `npm run build` - Build for production
  
- `npm run preview` - Preview production build
  

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
  
2. Create your feature branch
  
3. Commit your changes
  
4. Push to the branch
  
5. Create a new Pull Request
  

## License

This project is licensed under the MIT License.

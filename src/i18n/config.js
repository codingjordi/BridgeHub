import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          // Common
          "app.name": "BridgeHub",
          "app.auth.signIn": "Sign In",
          "app.auth.createAccount": "Create Account",
          "app.menu.greeting": "Hello, {{name}}!",
          "app.menu.settings": "Settings",
          "app.menu.support": "Support",
          "app.menu.signOut": "Sign Out",

          // Auth page
          "auth.welcome": "Welcome to BridgeHub",
          "auth.loginDescription": "Sign in to continue",
          "auth.registerDescription": "Create an account to get started",
          "auth.login": "Login",
          "auth.register": "Register",
          "auth.fullName": "Full Name",
          "auth.username": "Username",
          "auth.email": "Email",
          "auth.password": "Password",
          "auth.confirmPassword": "Confirm Password",
          "auth.loading": "Loading...",
          "auth.signIn": "Sign in",
          "auth.createAccount": "Create account",
          "auth.acceptTerms": "I accept the",
          "auth.termsLink": "Terms and Conditions",
          "auth.acceptNewsletter": "I want to receive news and updates via email",
          "auth.continueWith": "Or continue with",
          "auth.error.passwordMatch": "Passwords do not match",
          "auth.error.acceptTerms": "You must accept the terms and conditions",
          "auth.error.emailVerification": "Please check your email to verify your account",

          // Authenticated Home
          "authenticatedHome.welcome": "Welcome back, {{name}}!",
          "authenticatedHome.summary": "Here's what's happening with your projects",
          
          "authenticatedHome.stats.completedProjects": "Completed Projects",
          "authenticatedHome.stats.hoursContributed": "Hours Contributed",
          "authenticatedHome.stats.teamworkRating": "Teamwork Rating",
          "authenticatedHome.stats.skillsGained": "Skills Gained",

          "authenticatedHome.activeProjects.title": "Active Projects",
          "authenticatedHome.activeProjects.viewAll": "View all projects",
          "authenticatedHome.activeProjects.new": "new",
          "authenticatedHome.activeProjects.progress": "Progress",
          "authenticatedHome.activeProjects.nextDeadline": "Next deadline",
          "authenticatedHome.activeProjects.viewDetails": "View details",

          "authenticatedHome.recentActivity.title": "Recent Activity",

          "authenticatedHome.recommendedProjects.title": "Recommended Projects",
          "authenticatedHome.recommendedProjects.match": "match",
          "authenticatedHome.recommendedProjects.viewProject": "View Project",

          // Projects
          "projects.title": "Projects",
          "projects.create": "Create Project",
          "projects.search": "Search projects...",
          "projects.filter.technology": "Technology",
          "projects.filter.role": "Role",
          "projects.apply": "Apply",
          "projects.roles": "Roles:",
          "projects.technologies": "Technologies:",
          "projects.filter.options.frontend": "Frontend",
          "projects.filter.options.backend": "Backend",
          "projects.filter.options.fullstack": "Full Stack",
          "projects.filter.options.design": "UI/UX Design",
          "projects.filter.options.react": "React",
          "projects.filter.options.node": "Node.js",
          "projects.filter.options.python": "Python",

          // Hero
          "hero.title": "Build Your Portfolio with Real Projects",
          "hero.description": "Connect with other developers, designers, and tech enthusiasts to create meaningful projects and gain real experience.",
          "hero.explore": "Explore Projects",
          "hero.start": "Get Started",

          // Features
          "features.title": "Why Choose BridgeHub?",
          "features.realExperience.title": "Real Experience",
          "features.realExperience.description": "Work on projects that matter and gain hands-on experience in a collaborative environment.",
          "features.connect.title": "Connect with Others",
          "features.connect.description": "Find teammates with complementary skills and build your professional network.",
          "features.portfolio.title": "Build your Portfolio",
          "features.portfolio.description": "Create impressive projects that demonstrate your skills to potential employers.",

          // How It Works
          "howItWorks.title": "How It Works",
          "howItWorks.step1.title": "Create Your Profile",
          "howItWorks.step1.description": "Sign up and tell us about your skills and interests.",
          "howItWorks.step2.title": "Join a Project",
          "howItWorks.step2.description": "Find a project that matches your skills or create your own.",
          "howItWorks.step3.title": "Start Building",
          "howItWorks.step3.description": "Collaborate with others and bring ideas to life.",

          // Benefits
          "benefits.title": "Why Join Us?",
          "benefits.practical.title": "Practical Experience",
          "benefits.practical.description": "Work on real projects and build a strong portfolio.",
          "benefits.networking.title": "Network Growth",
          "benefits.networking.description": "Connect with like-minded professionals and expand your network.",
          "benefits.portfolio.title": "Portfolio Building",
          "benefits.portfolio.description": "Create a compelling portfolio that showcases your skills.",
          "benefits.learning.title": "Continuous Learning",
          "benefits.learning.description": "Learn from peers and stay up-to-date with industry trends.",

          // CTA
          "cta.title": "Ready to Start Your Journey?",
          "cta.description": "Join our community of developers and start building amazing projects today.",
          "cta.button": "Join Now",

          // Footer
          "footer.company": "Company",
          "footer.about": "About",
          "footer.careers": "Careers",
          "footer.blog": "Blog",
          "footer.press": "Press",
          
          "footer.legal": "Legal",
          "footer.terms": "Terms",
          "footer.privacy": "Privacy",
          "footer.cookies": "Cookies",
          "footer.guidelines": "Guidelines",
          
          "footer.support": "Support",
          "footer.help": "Help Center",
          "footer.contact": "Contact Us",
          "footer.status": "System Status",
          "footer.feedback": "Feedback",
          
          "footer.preferences": "Preferences",
          "footer.theme": "Theme",
          "footer.language": "Language",
          
          "footer.copyright": "© 2024 BridgeHub. All rights reserved.",
          "footer.madeWith": "Made with ❤️ by developers for developers",

          // Create Project
          "createProject.title": "Create Project",
          "createProject.form.title": "Project Title",
          "createProject.form.titlePlaceholder": "Enter a descriptive title for your project",
          "createProject.form.description": "Project Description",
          "createProject.form.descriptionPlaceholder": "Describe your project, its objectives and requirements",
          "createProject.form.skills": "Required Skills",
          "createProject.form.skillsPlaceholder": "e.g., React, Node.js, UI/UX (comma separated)",
          "createProject.form.modality": "Work Modality",
          "createProject.form.modalities.remote": "Remote",
          "createProject.form.modalities.hybrid": "Hybrid",
          "createProject.form.modalities.presential": "On-site",
          "createProject.form.maxMembers": "Maximum Team Size",
          "createProject.form.submit": "Create Project",
          "createProject.form.submitting": "Creating...",
          "createProject.success.title": "Project Created",
          "createProject.success.description": "Your project has been created successfully",
          "createProject.error.title": "Error",
          "createProject.error.description": "There was an error creating your project. Please try again.",
          "createProject.error.requiredFields": "Please fill in all required fields"
        }
      },
      es: {
        translation: {
          // Común
          "app.name": "BridgeHub",
          "app.auth.signIn": "Iniciar Sesión",
          "app.auth.createAccount": "Crear Cuenta",
          "app.menu.greeting": "¡Hola, {{name}}!",
          "app.menu.settings": "Configuración",
          "app.menu.support": "Soporte",
          "app.menu.signOut": "Cerrar Sesión",

          // Auth page
          "auth.welcome": "Bienvenido a BridgeHub",
          "auth.loginDescription": "Inicia sesión para continuar",
          "auth.registerDescription": "Crea una cuenta para empezar",
          "auth.login": "Iniciar sesión",
          "auth.register": "Registrarse",
          "auth.fullName": "Nombre completo",
          "auth.username": "Nombre de usuario",
          "auth.email": "Correo electrónico",
          "auth.password": "Contraseña",
          "auth.confirmPassword": "Confirmar Contraseña",
          "auth.loading": "Cargando...",
          "auth.signIn": "Iniciar sesión",
          "auth.createAccount": "Crear cuenta",
          "auth.acceptTerms": "Acepto los",
          "auth.termsLink": "Términos y Condiciones",
          "auth.acceptNewsletter": "Quiero recibir noticias y actualizaciones por correo electrónico",
          "auth.continueWith": "O continuar con",
          "auth.error.passwordMatch": "Las contraseñas no coinciden",
          "auth.error.acceptTerms": "Debes aceptar los términos y condiciones",
          "auth.error.emailVerification": "Por favor, verifica tu correo electrónico",

          // Authenticated Home
          "authenticatedHome.welcome": "¡Bienvenido de nuevo, {{name}}!",
          "authenticatedHome.summary": "Esto es lo que está pasando con tus proyectos",
          
          "authenticatedHome.stats.completedProjects": "Proyectos Completados",
          "authenticatedHome.stats.hoursContributed": "Horas Contribuidas",
          "authenticatedHome.stats.teamworkRating": "Valoración de Trabajo en Equipo",
          "authenticatedHome.stats.skillsGained": "Habilidades Adquiridas",

          "authenticatedHome.activeProjects.title": "Proyectos Activos",
          "authenticatedHome.activeProjects.viewAll": "Ver todos los proyectos",
          "authenticatedHome.activeProjects.new": "nuevo",
          "authenticatedHome.activeProjects.progress": "Progreso",
          "authenticatedHome.activeProjects.nextDeadline": "Próxima fecha límite",
          "authenticatedHome.activeProjects.viewDetails": "Ver detalles",

          "authenticatedHome.recentActivity.title": "Actividad Reciente",

          "authenticatedHome.recommendedProjects.title": "Proyectos Recomendados",
          "authenticatedHome.recommendedProjects.match": "coincidencia",
          "authenticatedHome.recommendedProjects.viewProject": "Ver Proyecto",

          // Projects
          "projects.title": "Proyectos",
          "projects.create": "Crear Proyecto",
          "projects.search": "Buscar proyectos...",
          "projects.filter.technology": "Tecnología",
          "projects.filter.role": "Rol",
          "projects.apply": "Aplicar",
          "projects.roles": "Roles:",
          "projects.technologies": "Tecnologías:",
          "projects.filter.options.frontend": "Frontend",
          "projects.filter.options.backend": "Backend",
          "projects.filter.options.fullstack": "Full Stack",
          "projects.filter.options.design": "Diseño UI/UX",
          "projects.filter.options.react": "React",
          "projects.filter.options.node": "Node.js",
          "projects.filter.options.python": "Python",

          // Hero
          "hero.title": "Construye tu Portafolio con Proyectos Reales",
          "hero.description": "Conéctate con otros desarrolladores, diseñadores y entusiastas de la tecnología para crear proyectos significativos y ganar experiencia real.",
          "hero.explore": "Explorar Proyectos",
          "hero.start": "Comenzar",

          // Features
          "features.title": "¿Por qué elegir BridgeHub?",
          "features.realExperience.title": "Experiencia Real",
          "features.realExperience.description": "Trabaja en proyectos que importan y gana experiencia práctica en un ambiente colaborativo.",
          "features.connect.title": "Conecta con Otros",
          "features.connect.description": "Encuentra compañeros con habilidades complementarias y construye tu red profesional.",
          "features.portfolio.title": "Construye tu Portafolio",
          "features.portfolio.description": "Crea proyectos impresionantes que demuestren tus habilidades a potenciales empleadores.",

          // How It Works
          "howItWorks.title": "¿Cómo Funciona?",
          "howItWorks.step1.title": "Crea tu Perfil",
          "howItWorks.step1.description": "Regístrate y cuéntanos sobre tus habilidades e intereses.",
          "howItWorks.step2.title": "Únete a un Proyecto",
          "howItWorks.step2.description": "Encuentra un proyecto que coincida con tus habilidades o crea el tuyo propio.",
          "howItWorks.step3.title": "Empieza a Construir",
          "howItWorks.step3.description": "Colabora con otros y da vida a las ideas.",

          // Benefits
          "benefits.title": "¿Por qué Unirte?",
          "benefits.practical.title": "Experiencia Práctica",
          "benefits.practical.description": "Trabaja en proyectos reales y construye un portafolio sólido.",
          "benefits.networking.title": "Crecimiento de Red",
          "benefits.networking.description": "Conéctate con profesionales afines y expande tu red.",
          "benefits.portfolio.title": "Construcción de Portafolio",
          "benefits.portfolio.description": "Crea un portafolio convincente que muestre tus habilidades.",
          "benefits.learning.title": "Aprendizaje Continuo",
          "benefits.learning.description": "Aprende de tus compañeros y mantente al día con las tendencias de la industria.",

          // CTA
          "cta.title": "¿Listo para Comenzar tu Viaje?",
          "cta.description": "Únete a nuestra comunidad de desarrolladores y comienza a construir proyectos increíbles hoy.",
          "cta.button": "Únete Ahora",

          // Footer
          "footer.company": "Empresa",
          "footer.about": "Sobre Nosotros",
          "footer.careers": "Empleo",
          "footer.blog": "Blog",
          "footer.press": "Prensa",
          
          "footer.legal": "Legal",
          "footer.terms": "Términos",
          "footer.privacy": "Privacidad",
          "footer.cookies": "Cookies",
          "footer.guidelines": "Directrices",
          
          "footer.support": "Soporte",
          "footer.help": "Centro de Ayuda",
          "footer.contact": "Contáctanos",
          "footer.status": "Estado del Sistema",
          "footer.feedback": "Sugerencias",
          
          "footer.preferences": "Preferencias",
          "footer.theme": "Tema",
          "footer.language": "Idioma",
          
          "footer.copyright": "© 2024 BridgeHub. Todos los derechos reservados.",
          "footer.madeWith": "Hecho con ❤️ por desarrolladores para desarrolladores",

          // Create Project
          "createProject.title": "Crear Proyecto",
          "createProject.form.title": "Título del Proyecto",
          "createProject.form.titlePlaceholder": "Ingresa un título descriptivo para tu proyecto",
          "createProject.form.description": "Descripción del Proyecto",
          "createProject.form.descriptionPlaceholder": "Describe tu proyecto, sus objetivos y requisitos",
          "createProject.form.skills": "Habilidades Requeridas",
          "createProject.form.skillsPlaceholder": "ej., React, Node.js, UI/UX (separados por coma)",
          "createProject.form.modality": "Modalidad de Trabajo",
          "createProject.form.modalities.remote": "Remoto",
          "createProject.form.modalities.hybrid": "Híbrido",
          "createProject.form.modalities.presential": "Presencial",
          "createProject.form.maxMembers": "Tamaño Máximo del Equipo",
          "createProject.form.submit": "Crear Proyecto",
          "createProject.form.submitting": "Creando...",
          "createProject.success.title": "Proyecto Creado",
          "createProject.success.description": "Tu proyecto ha sido creado exitosamente",
          "createProject.error.title": "Error",
          "createProject.error.description": "Hubo un error al crear tu proyecto. Por favor, intenta de nuevo.",
          "createProject.error.requiredFields": "Por favor, completa todos los campos requeridos"
        }
      }
    }
  });

export default i18n;
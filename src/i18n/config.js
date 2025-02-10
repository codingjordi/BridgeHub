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
          // Navbar
          "app.name": "BridgeHub",
          "app.auth.signIn": "Sign In",
          "app.auth.createAccount": "Create Account",
          "app.menu.greeting": "Hello, {{name}}!",
          "app.menu.profile": "My profile",
          "app.menu.explore": "Explore projects",
          "app.menu.settings": "Settings",
          "app.menu.support": "Support",
          "app.menu.signOut": "Sign Out",

          // Auth 🔐
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
          "auth.error.invalidEmail": "Invalid email address",
          "auth.error.passwordLength": "Password must be at least 6 characters",
          "auth.error.passwordUppercase": "Password must contain at least one uppercase letter",
          "auth.error.passwordNumber": "Password must contain at least one number",
          "auth.error.fullNameLength": "Full name must be at least 2 characters",
          "auth.error.usernameLength": "Username must be at least 3 characters",
          "auth.error.usernameFormat": "Username can only contain letters, numbers and underscores",

          // AuthenticatedHome
          "authenticatedHome.welcome": "Welcome back, {{name}}!",
          "authenticatedHome.summary": "Here's what's happening with your projects",
          
          "authenticatedHome.stats.completedProjects": "Completed Projects",
          "authenticatedHome.stats.hoursContributed": "Hours Contributed",
          "authenticatedHome.stats.teamworkRating": "Teamwork Rating",
          "authenticatedHome.stats.skillsGained": "Skills Gained",

          "authenticatedHome.activeProjects.title": "Your Current Projects",
          "authenticatedHome.activeProjects.viewAll": "View all projects",
          "authenticatedHome.activeProjects.new": "new",
          "authenticatedHome.activeProjects.progress": "Progress",
          "authenticatedHome.activeProjects.nextDeadline": "Next deadline",
          "authenticatedHome.activeProjects.viewDetails": "View details",

          "authenticatedHome.recentActivity.title": "Recent Activity",

          "authenticatedHome.recommendedProjects.title": "Recommended Projects",
          "authenticatedHome.recommendedProjects.match": "match",
          "authenticatedHome.recommendedProjects.viewProject": "View Project",

          // Profile
          "profile.edit" : "Edit profile",
          "profile.projects" : "Projects",
          "profile.collaborations" : "Collaborations",
          "profile.rating" : "Rating",

          // Projects
          "projects.title": "Projects",
          "projects.create": "Create Project",
          "projects.search": "Search projects...",
          "projects.noProjects": "No project match your search",
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

          // Project details
          "project.details.back" : "Back to Projects",
          "project.details.edit" : "Edit Project",
          "project.details.description" : "Description",
          "project.details.required.skills" : "Required Skills",
          "project.details.team.members" : "Team Members",
          "project.details.team.empty" : "No team members yet",
          "project.details.applications.apply": "Apply to Project",
          "project.details.apply.already": "You have already applied to this project",
          "project.details.applications" : "Applications",
          "project.details.applications.empty" : "No applications yet",
          "project.details.applications.accept" : "Accept",
          "project.details.applications.reject" : "Reject",
          "project.details.max.members" : "Up to {{max_members}} members",
          "project.details.details.title" : "Details",
          "project.details.details.team.size" : "Team Size",
          "project.details.details.max.members" : "Up to {{max_members}} members",
          "project.details.details.modality": "Modality",
          "project.details.applications.modal.title": "Tell the project owner why you would be a good fit for this project",
          "project.details.applications.modal.submit": "Submit Application",
          "project.details.applications.modal.cancel": "Cancel",
          "project.details.applications.modal.submitting": "Submitting...",
          "project.details.applications.modal.text.placeholder": "Describe your experience, your knowladge and why you're interested in this project...",
          "project.details.applications.modal.text.label": "Your Application",
          "project.details.applications.sign.in": "Sign in now",
          "project.details.applications.applied_at": 'Applied on {{date}}',
          



          // Home - Hero
          "hero.title": "Build Your Portfolio with Real Projects",
          "hero.description": "Connect with other developers, designers, and tech enthusiasts to create meaningful projects and gain real experience.",
          "hero.explore": "Explore Projects",
          "hero.start": "Get Started",

          // Home - Features
          "features.title": "Why Choose BridgeHub?",
          "features.realExperience.title": "Real Experience",
          "features.realExperience.description": "Work on projects that matter and gain hands-on experience in a collaborative environment.",
          "features.connect.title": "Connect with Others",
          "features.connect.description": "Find teammates with complementary skills and build your professional network.",
          "features.portfolio.title": "Build your Portfolio",
          "features.portfolio.description": "Create impressive projects that demonstrate your skills to potential employers.",

          // Home - How It Works
          "howItWorks.title": "How It Works",
          "howItWorks.step1.title": "Create Your Profile",
          "howItWorks.step1.description": "Sign up and tell us about your skills and interests.",
          "howItWorks.step2.title": "Join a Project",
          "howItWorks.step2.description": "Find a project that matches your skills or create your own.",
          "howItWorks.step3.title": "Start Building",
          "howItWorks.step3.description": "Collaborate with others and bring ideas to life.",

          // Home - Benefits
          
          /* cambiarlo por algo como benefits.benefit${benefitNumber}.title */
          /* cambiarlo por algo como benefits.benefit${benefitNumber}.description */

          "benefits.title": "Why Choose BridgeHub?",
          "benefits.benefit1.title": "Practical Experience",
          "benefits.benefit1.description": "Work on real projects and build a strong portfolio.",
          "benefits.benefit2.title": "Network Growth",
          "benefits.benefit2.description": "Connect with like-minded professionals and expand your network.",
          "benefits.benefit3.title": "Portfolio Building",
          "benefits.benefit3.description": "Create a compelling portfolio that showcases your skills.",
          "benefits.benefit4.title": "Continuous Learning",
          "benefits.benefit4.description": "Learn from peers and stay up-to-date with industry trends.",

          // Home - CTA
          "cta.title": "Ready to Start Your Journey?",
          "cta.description": "Join our community of developers and start building amazing projects today.",
          "cta.button": "Join Now",

          // Footer 🦶
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
          "footer.madeBy": "Made with ❤️ by <code><a>codingjordi</a></code>",

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
          "createProject.error.requiredFields": "Please fill in all required fields",

          // Not Found ⚠️
          "notFound.title": "Page Not Found",
          "notFound.description": "The page you're looking for doesn't exist or has been moved.",
        }
      },
      es: {
        translation: {
          // Cabecera
          "app.name": "BridgeHub",
          "app.auth.signIn": "Iniciar Sesión",
          "app.auth.createAccount": "Crear Cuenta",
          "app.menu.greeting": "¡Hola, {{name}}!",
          "app.menu.profile": "Mi perfil",
          "app.menu.explore": "Explorar proyectos",
          "app.menu.settings": "Configuración",
          "app.menu.support": "Soporte",
          "app.menu.signOut": "Cerrar Sesión",

          // Auth
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
          "auth.error.invalidEmail": "Dirección de correo electrónico inválida",
          "auth.error.passwordLength": "La contraseña debe tener al menos 6 caracteres",
          "auth.error.passwordUppercase": "La contraseña debe contener al menos una letra mayúscula",
          "auth.error.passwordNumber": "La contraseña debe contener al menos un número",
          "auth.error.fullNameLength": "El nombre completo debe tener al menos 2 caracteres",
          "auth.error.usernameLength": "El nombre de usuario debe tener al menos 3 caracteres",
          "auth.error.usernameFormat": "El nombre de usuario solo puede contener letras, números y guiones bajos",

          // AuthenticatedHome
          "authenticatedHome.welcome": "¡Bienvenido de nuevo, {{name}}!",
          "authenticatedHome.summary": "Esto es lo que está pasando con tus proyectos",
          
          "authenticatedHome.stats.completedProjects": "Proyectos Completados",
          "authenticatedHome.stats.hoursContributed": "Horas Contribuidas",
          "authenticatedHome.stats.teamworkRating": "Valoración de Trabajo en Equipo",
          "authenticatedHome.stats.skillsGained": "Habilidades Adquiridas",

          "authenticatedHome.activeProjects.title": "Tus proyectos en curso",
          "authenticatedHome.activeProjects.viewAll": "Explora todos los proyectos activos",
          "authenticatedHome.activeProjects.new": "nuevo",
          "authenticatedHome.activeProjects.progress": "Progreso",
          "authenticatedHome.activeProjects.nextDeadline": "Próxima fecha límite",
          "authenticatedHome.activeProjects.viewDetails": "Ver detalles",

          "authenticatedHome.recentActivity.title": "Actividad Reciente",

          "authenticatedHome.recommendedProjects.title": "Proyectos Recomendados",
          "authenticatedHome.recommendedProjects.match": "coincidencia",
          "authenticatedHome.recommendedProjects.viewProject": "Ver Proyecto",

          // Profile
          "profile.edit" : "Editar perfil",
          "profile.projects" : "Proyectos",
          "profile.collaborations" : "Colaboraciones",
          "profile.rating" : "Puntuación",

          // Projects
          "projects.title": "Proyectos",
          "projects.create": "Crear Proyecto",
          "projects.search": "Buscar proyectos...",
          "projects.noProjects": "Ningún proyecto coincide con tu búsqueda",
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

          // Project details
          "project.details.back" : "Volver a Proyectos",
          "project.details.edit" : "Editar Proyecto",
          "project.details.description" : "Descripción",
          "project.details.required.skills" : "Habilidades Requeridas",
          "project.details.team.members" : "Miembros del Equipo",
          "project.details.team.empty" : "No hay miembros en el equipo todavía",
          "project.details.apply": "Aplicar al Proyecto",
          "project.details.applications" : "Aplicaciones",
          "project.details.applications.empty" : "No hay aplicaciones todavía",
          "project.details.applications.accept" : "Aceptar",
          "project.details.applications.reject" : "Rechazar",
          "project.details.max.members" : "Hasta {{max_members}} miembros",
          "project.details.modality": "Modalidad",
          "project.details.applications.modal.submit": "Enviar Aplicación",
          "project.details.applications.modal.submitting": "Enviando...",
          "project.details.applications.modal.text.placeholder": "Describe tu experiencia, tus conocimientos y por qué te interesa este proyecto...",
          "project.details.applications.modal.text.label": "Tu aplicación",
          "project.details.applications.modal.title": "Aplica al Proyecto",
          "project.details.applications.modal.description": "Cuéntale al propietario del proyecto por qué serías un buen candidato para este proyecto",
          "project.details.applications.applied_at": 'Aplicado el {{date}}',
          


          // Project details
            "project.details.back": "Volver a Proyectos",
            "project.details.edit": "Editar Proyecto",
            "project.details.description": "Descripción",
            "project.details.required.skills": "Habilidades Requeridas",
            "project.details.team.members": "Miembros del Equipo",
            "project.details.team.empty": "Aún no hay miembros en el equipo",
            "project.details.applications.apply": "Aplicar al Proyecto",
            "project.details.apply.already": "Ya has aplicado a este proyecto",
            "project.details.applications": "Aplicaciones",
            "project.details.applications.empty": "Aún no hay aplicaciones",
            "project.details.applications.accept": "Aceptar",
            "project.details.applications.reject": "Rechazar",
            "project.details.details.title": "Detalles",
            "project.details.details.team.size": "Equipo",
            "project.details.details.max.members": "Hasta {{max_members}} miembros",
            "project.details.details.modality": "Modalidad",
            "project.details.applications.modal.submit": "Enviar Solicitud",
            "project.details.applications.modal.cancel": "Cancelar",
            "project.details.applications.modal.submitting": "Enviando...",
            "project.details.applications.text.placeholder": "Describe tu experiencia, tus conocimientos y por qué te interesa este proyecto...",
            "project.details.applications.text.label": "Tu Solicitud",
            "project.details.applications.title": "Cuéntale al propietario del proyecto por qué serías unx buenx candidatx para este proyecto",
            "project.details.applications.sign.in.title": "Inicia sesión para poder aplicar",
            "project.details.applications.sign.in.button": "Inicia sesión ahora",
    

            
          


          // Home - Hero
          "hero.title": "Construye tu Portafolio con Proyectos Reales",
          "hero.description": "Conéctate con otros desarrolladores, diseñadores y entusiastas de la tecnología para crear proyectos significativos y ganar experiencia real.",
          "hero.explore": "Explorar Proyectos",
          "hero.start": "Comenzar",

          // Home - Features
          "features.title": "?",
          "features.realExperience.title": "Experiencia Real",
          "features.realExperience.description": "Trabaja en proyectos que importan y gana experiencia práctica en un ambiente colaborativo.",
          "features.connect.title": "Conecta con Otros",
          "features.connect.description": "Encuentra compañeros con habilidades complementarias y construye tu red profesional.",
          "features.portfolio.title": "Construye tu Portafolio",
          "features.portfolio.description": "Crea proyectos impresionantes que demuestren tus habilidades a potenciales empleadores.",

          // Home - How It Works
          "howItWorks.title": "¿Cómo Funciona?",
          "howItWorks.step1.title": "Crea tu Perfil",
          "howItWorks.step1.description": "Regístrate y cuéntanos sobre tus habilidades e intereses.",
          "howItWorks.step2.title": "Únete a un Proyecto",
          "howItWorks.step2.description": "Encuentra un proyecto que coincida con tus habilidades o crea el tuyo propio.",
          "howItWorks.step3.title": "Empieza a Construir",
          "howItWorks.step3.description": "Colabora con otros y da vida a las ideas.",

          // Home - Benefits
          "benefits.title": "¿Por qué elegir BridgeHub?",
          "benefits.benefit1.title": "Experiencia Práctica",
          "benefits.benefit1.description": "Trabaja en proyectos reales y construye un portafolio sólido.",
          "benefits.benefit2.title": "Crecimiento de Red",
          "benefits.benefit2.description": "Conéctate con profesionales afines y expande tu red.",
          "benefits.benefit3.title": "Construcción de Portafolio",
          "benefits.benefit3.description": "Crea un portafolio convincente que muestre tus habilidades.",
          "benefits.benefit4.title": "Aprendizaje Continuo",
          "benefits.benefit4.description": "Aprende de tus compañeros y mantente al día con las tendencias de la industria.",

          // Home - CTA
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
          "footer.madeBy": "Hecho con ❤️ por <code><a>codingjordi</a></code>",

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
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "fr" | "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dictionnaires de traduction
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "Qui sommes-nous",
    "nav.services": "Services bancaires",
    "nav.products": "Produits bancaires",
    "nav.loans": "Demander un prêt",
    "nav.savings": "Épargne & Investissement",
    "nav.support": "Support",
    "nav.login": "Se connecter",
    "nav.register": "Ouvrir un compte",
    
    // Hero section
    "hero.title": "Bienvenue sur le portail de notre banque",
    "hero.subtitle": "Accédez à vos services bancaires en ligne en toute sécurité",
    "hero.register": "Ouvrir un compte gratuitement",
    "hero.login": "Se connecter à mon compte",
    
    // Stats
    "stats.clients": "Clients satisfaits",
    "stats.fees": "Frais de transfert",
    "stats.available": "Service disponible",
    
    // About section
    "about.title": "Qui sommes-nous ?",
    "about.description": "Corix Finanza est une banque digitale innovante créée pour transformer le secteur financier en Espagne.",
    "about.paragraph1": "Fondée en 2022, notre mission est de rendre les services bancaires accessibles, transparents et abordables pour tous, grâce à une technologie de pointe et une approche centrée sur l'utilisateur.",
    "about.paragraph2": "Nous croyons que chaque personne mérite un accès simple et sécurisé à des services financiers modernes, quels que soient son revenu, sa localisation ou son niveau d'éducation.",
    "about.year": "Année de fondation",
    "about.countries": "Pays opérationnels",
    
    // Team sections
    "team.ourTeam": "Notre équipe",
    "team.experts": "Experts en finance, technologie et innovation",
    "team.commitment": "Notre engagement",
    "team.security": "Sécurité et conformité réglementaire totale",
    "team.vision": "Notre vision",
    "team.transform": "Transformer le secteur financier africain",
    
    // Promises section
    "promises.title": "Nos promesses à vous",
    "promises.subtitle": "Chez Corix Finanza, nous construisons une expérience bancaire différente",
    "promises.security": "Sécurité maximale",
    "promises.securityDesc": "Chiffrement bancaire, authentification à deux facteurs et licence régulée",
    "promises.speed": "Rapidité instantanée",
    "promises.speedDesc": "Transferts en quelques secondes, ouverture de compte en 5 minutes",
    "promises.transparency": "Transparence totale",
    "promises.transparencyDesc": "Pas de frais cachés. Tous les taux affichés clairement",
    "promises.accessibility": "Accessible à tous",
    "promises.accessibilityDesc": "Interface simple et support en langue locale",
    
    // Products section
    "products.title": "Nos produits bancaires",
    "products.subtitle": "Tout ce dont vous avez besoin pour gérer vos finances au quotidien",
    "products.digitalAccount": "Compte digital",
    "products.digitalDesc": "Ouvrez un compte en quelques minutes sans paperasse. Recevez votre carte virtuelle instantanément.",
    "products.transfers": "Transferts",
    "products.transfersDesc": "Envoyez de l'argent à vos proches instantanément, 24h/24, avec seulement 1% de frais.",
    "products.savings": "Épargne et crédit",
    "products.savingsDesc": "Épargnez automatiquement et accédez à des crédits rapides et transparents.",
    
    // Features
    "feature.banking": "Licence bancaire régulée",
    "feature.countries": "3 pays : Espagne, France, USA",
    "feature.mobile": "Application mobile iOS & Android",
    
    // Testimonials
    "testimonials.title": "Ce que disent nos clients",
    "testimonials.subtitle": "Rejoignez la communauté de 50,000+ utilisateurs satisfaits",
    
    // Stats testimonials
    "stats.rating": "Note moyenne sur l'App Store",
    "stats.satisfied": "Clients satisfaits",
    "stats.transferred": "Transférés ce mois",
    
    // CTA section
    "cta.title": "Prêt à simplifier votre vie financière ?",
    "cta.subtitle": "Rejoignez la révolution bancaire en Europe",
    "cta.register": "Ouvrir mon compte gratuitement",
    "cta.login": "Se connecter",
    
    // Advantages
    "advantage.quick": "Ouverture en 5 minutes",
    "advantage.noFees": "Pas de frais cachés",
    "advantage.support": "Support 7j/7",
    
    // Support section
    "support.title": "Support & Contact",
    "support.subtitle": "Nous sommes là pour vous aider. Contactez-nous par le canal qui vous convient le mieux.",
    "support.phone": "Support téléphonique",
    "support.phoneHours": "Du lundi au vendredi, 8h-20h",
    "support.email": "Email",
    "support.emailResponse": "Réponse sous 24h",
    "support.helpCenter": "Centre d'aide",
    "support.faq": "FAQ, tutoriels et guides",
    
    // Footer
    "footer.cgu": "CGU",
    "footer.privacy": "Confidentialité",
    "footer.contact": "Contact",
    "footer.copyright": "© 2026 Corix Finanza. Tous droits réservés. Banque agréée et régulée en Espagne.",
    
    // Common
    "common.viewAll": "Voir tout",
    "common.more": "En savoir plus",
    "common.selectCountry": "Sélectionnez un pays",
    "common.required": "Requis",
    
    // Validation errors
    "validation.lastNameRequired": "Le nom est requis",
    "validation.lastNameMinLength": "Le nom doit contenir au moins 2 caractères",
    "validation.lastNameInvalid": "Le nom ne doit contenir que des lettres",
    "validation.firstNameRequired": "Le prénom est requis",
    "validation.firstNameMinLength": "Le prénom doit contenir au moins 2 caractères",
    "validation.firstNameInvalid": "Le prénom ne doit contenir que des lettres",
    "validation.cityRequired": "La ville est requise",
    "validation.cityMinLength": "La ville doit contenir au moins 2 caractères",
    "validation.professionMaxLength": "La profession ne doit pas dépasser 100 caractères",
    "validation.idTypeRequired": "Le type de pièce d'identité est requis",
    "validation.idNumberRequired": "Le numéro de pièce d'identité est requis",
    "validation.idNumberMinLength": "Le numéro doit contenir au moins 4 caractères",
    "validation.idNumberInvalid": "Format invalide (lettres et chiffres seulement)",
    "validation.idFileRequired": "Le document d'identité est requis",
    "validation.idFileTooLarge": "Le fichier ne doit pas dépasser 5MB",
    "validation.idFileInvalidType": "Format invalide (JPG, PNG ou PDF uniquement)",
    "validation.emailRequired": "L'email est requis",
    "validation.emailInvalid": "Format d'email invalide",
    "validation.passwordRequired": "Le mot de passe est requis",
    "validation.passwordMinLength": "Au moins 8 caractères",
    "validation.passwordUppercase": "Au moins une majuscule",
    "validation.passwordNumber": "Au moins un chiffre",
    "validation.confirmPasswordRequired": "La confirmation du mot de passe est requise",
    "validation.confirmPasswordMismatch": "Les mots de passe ne correspondent pas",
    "validation.phoneRequired": "Le numéro de téléphone est requis",
    "validation.phoneInvalid": "Numéro de téléphone invalide",
    "validation.termsRequired": "Vous devez accepter les conditions générales",
    
    // 404 page
    "notFound.title": "Page non trouvée",
    "notFound.subtitle": "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    "notFound.backHome": "Retour à l'accueil",
    "notFound.contactSupport": "Contacter le support",
    
    // Placeholders
    "placeholder.firstName": "Votre prénom",
    "placeholder.lastName": "Votre nom",
    "placeholder.email": "votre@email.com",
    "placeholder.subject": "Objet de votre message",
    "placeholder.message": "Votre message...",
    "placeholder.typeMessage": "Tapez votre message...",
    "placeholder.briefProblem": "Décrivez brièvement votre problème",
    "placeholder.detailProblem": "Décrivez votre problème en détail...",
    "placeholder.searchContact": "Rechercher un contact...",
    "placeholder.amount": "0,00",
    "placeholder.enterEmail": "Entrez votre email",
    "placeholder.enterLastName": "Entrez votre nom de famille",
    "placeholder.enterFirstName": "Entrez votre prénom",
    "placeholder.enterCity": "Entrez votre ville",
    "placeholder.profession": "Ex: Ingénieur, Enseignant, Commerçant...",
    "placeholder.createPassword": "Créez un mot de passe",
    "placeholder.confirmPassword": "Confirmez votre mot de passe",
    "placeholder.enterPassword": "Entrez votre mot de passe",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Quiénes somos",
    "nav.services": "Servicios bancarios",
    "nav.products": "Productos bancarios",
    "nav.loans": "Solicitar un préstamo",
    "nav.savings": "Ahorro e Inversión",
    "nav.support": "Soporte",
    "nav.login": "Iniciar sesión",
    "nav.register": "Abrir una cuenta",
    
    // Hero section
    "hero.title": "Bienvenido al portal de nuestro banco",
    "hero.subtitle": "Acceda a sus servicios bancarios en línea con total seguridad",
    "hero.register": "Abrir una cuenta gratis",
    "hero.login": "Iniciar sesión en mi cuenta",
    
    // Stats
    "stats.clients": "Clientes satisfechos",
    "stats.fees": "Comisiones de transferencia",
    "stats.available": "Servicio disponible",
    
    // About section
    "about.title": "¿Quiénes somos?",
    "about.description": "Corix Finanza es un banco digital innovador creado para transformar el sector financiero en España.",
    "about.paragraph1": "Fundada en 2022, nuestra misión es hacer los servicios bancarios accesibles, transparentes y asequibles para todos, gracias a una tecnología de vanguardia y un enfoque centrado en el usuario.",
    "about.paragraph2": "Creemos que cada persona merece un acceso simple y seguro a servicios financieros modernos, independientemente de sus ingresos, ubicación o nivel educativo.",
    "about.year": "Año de fundación",
    "about.countries": "Países operativos",
    
    // Team sections
    "team.ourTeam": "Nuestro equipo",
    "team.experts": "Expertos en finanzas, tecnología e innovación",
    "team.commitment": "Nuestro compromiso",
    "team.security": "Seguridad y cumplimiento regulatorio total",
    "team.vision": "Nuestra visión",
    "team.transform": "Transformar el sector financiero africano",
    
    // Promises section
    "promises.title": "Nuestras promesas para ti",
    "promises.subtitle": "En Corix Finanza, construimos una experiencia bancaria diferente",
    "promises.security": "Máxima seguridad",
    "promises.securityDesc": "Cifrado bancario, autenticación de dos factores y licencia regulada",
    "promises.speed": "Rapidez instantánea",
    "promises.speedDesc": "Transferencias en segundos, apertura de cuenta en 5 minutos",
    "promises.transparency": "Transparencia total",
    "promises.transparencyDesc": "Sin comisiones ocultas. Todas las tarifas mostradas claramente",
    "promises.accessibility": "Accesible para todos",
    "promises.accessibilityDesc": "Interfaz simple y soporte en idioma local",
    
    // Products section
    "products.title": "Nuestros productos bancarios",
    "products.subtitle": "Todo lo que necesitas para gestionar tus finanzas diarias",
    "products.digitalAccount": "Cuenta digital",
    "products.digitalDesc": "Abre una cuenta en minutos sin papeleo. Recibe tu tarjeta virtual al instante.",
    "products.transfers": "Transferencias",
    "products.transfersDesc": "Envía dinero a tus seres queridos al instante, 24/7, con solo el 1% de comisión.",
    "products.savings": "Ahorro y crédito",
    "products.savingsDesc": "Ahorra automáticamente y accede a créditos rápidos y transparentes.",
    
    // Features
    "feature.banking": "Licencia bancaria regulada",
    "feature.countries": "3 países: España, Francia, USA",
    "feature.mobile": "Aplicación móvil iOS y Android",
    
    // Testimonials
    "testimonials.title": "Lo que dicen nuestros clientes",
    "testimonials.subtitle": "Únete a la comunidad de 50,000+ usuarios satisfechos",
    
    // Stats testimonials
    "stats.rating": "Puntuación media en App Store",
    "stats.satisfied": "Clientes satisfechos",
    "stats.transferred": "Transferidos este mes",
    
    // CTA section
    "cta.title": "¿Listo para simplificar tu vida financiera?",
    "cta.subtitle": "Únete a la revolución bancaria en Europa",
    "cta.register": "Abrir mi cuenta gratis",
    "cta.login": "Iniciar sesión",
    
    // Advantages
    "advantage.quick": "Apertura en 5 minutos",
    "advantage.noFees": "Sin comisiones ocultas",
    "advantage.support": "Soporte 7 días/semana",
    
    // Support section
    "support.title": "Soporte y Contacto",
    "support.subtitle": "Estamos aquí para ayudarte. Contáctanos por el canal que más te convenga.",
    "support.phone": "Soporte telefónico",
    "support.phoneHours": "De lunes a viernes, 8h-20h",
    "support.email": "Email",
    "support.emailResponse": "Respuesta en 24 horas",
    "support.helpCenter": "Centro de ayuda",
    "support.faq": "FAQ, tutoriales y guías",
    
    // Footer
    "footer.cgu": "Términos y condiciones",
    "footer.privacy": "Privacidad",
    "footer.contact": "Contacto",
    "footer.copyright": "© 2026 Corix Finanza. Todos los derechos reservados. Banco autorizado y regulado en España.",
    
    // Common
    "common.viewAll": "Ver todo",
    "common.more": "Saber más",
    "common.selectCountry": "Seleccionar país",
    "common.required": "Requerido",
    
    // Validation errors
    "validation.lastNameRequired": "El apellido es requerido",
    "validation.lastNameMinLength": "El apellido debe contener al menos 2 caracteres",
    "validation.lastNameInvalid": "El apellido solo debe contener letras",
    "validation.firstNameRequired": "El nombre es requerido",
    "validation.firstNameMinLength": "El nombre debe contener al menos 2 caracteres",
    "validation.firstNameInvalid": "El nombre solo debe contener letras",
    "validation.cityRequired": "La ciudad es requerida",
    "validation.cityMinLength": "La ciudad debe contener al menos 2 caracteres",
    "validation.professionMaxLength": "La profesión no debe exceder 100 caracteres",
    "validation.idTypeRequired": "El tipo de documento de identidad es requerido",
    "validation.idNumberRequired": "El número de documento de identidad es requerido",
    "validation.idNumberMinLength": "El número debe contener al menos 4 caracteres",
    "validation.idNumberInvalid": "Formato inválido (solo letras y números)",
    "validation.idFileRequired": "El documento de identidad es requerido",
    "validation.idFileTooLarge": "El archivo no debe exceder 5MB",
    "validation.idFileInvalidType": "Formato inválido (solo JPG, PNG o PDF)",
    "validation.emailRequired": "El email es requerido",
    "validation.emailInvalid": "Formato de email inválido",
    "validation.passwordRequired": "La contraseña es requerida",
    "validation.passwordMinLength": "Al menos 8 caracteres",
    "validation.passwordUppercase": "Al menos una mayúscula",
    "validation.passwordNumber": "Al menos un número",
    "validation.confirmPasswordRequired": "La confirmación de contraseña es requerida",
    "validation.confirmPasswordMismatch": "Las contraseñas no coinciden",
    "validation.phoneRequired": "El número de teléfono es requerido",
    "validation.phoneInvalid": "Número de teléfono inválido",
    "validation.termsRequired": "Debe aceptar los términos y condiciones",
    
    // 404 page
    "notFound.title": "Página no encontrada",
    "notFound.subtitle": "Lo sentimos, la página que busca no existe o ha sido movida.",
    "notFound.backHome": "Volver al inicio",
    "notFound.contactSupport": "Contactar soporte",
    
    // Placeholders
    "placeholder.firstName": "Tu nombre",
    "placeholder.lastName": "Tu apellido",
    "placeholder.email": "tu@email.com",
    "placeholder.subject": "Asunto de tu mensaje",
    "placeholder.message": "Tu mensaje...",
    "placeholder.typeMessage": "Escribe tu mensaje...",
    "placeholder.briefProblem": "Describe brevemente tu problema",
    "placeholder.detailProblem": "Describe tu problema en detalle...",
    "placeholder.searchContact": "Buscar contacto...",
    "placeholder.amount": "0,00",
    "placeholder.enterEmail": "Introduce tu email",
    "placeholder.enterLastName": "Introduce tu apellido",
    "placeholder.enterFirstName": "Introduce tu nombre",
    "placeholder.enterCity": "Introduce tu ciudad",
    "placeholder.profession": "Ej: Ingeniero, Profesor, Comerciante...",
    "placeholder.createPassword": "Crea una contraseña",
    "placeholder.confirmPassword": "Confirma tu contraseña",
    "placeholder.enterPassword": "Introduce tu contraseña",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Banking Services",
    "nav.products": "Banking Products",
    "nav.loans": "Apply for a Loan",
    "nav.savings": "Savings & Investment",
    "nav.support": "Support",
    "nav.login": "Login",
    "nav.register": "Open an Account",
    
    // Hero section
    "hero.title": "Welcome to our bank portal",
    "hero.subtitle": "Access your online banking services with complete security",
    "hero.register": "Open a free account",
    "hero.login": "Login to my account",
    
    // Stats
    "stats.clients": "Satisfied clients",
    "stats.fees": "Transfer fees",
    "stats.available": "Available service",
    
    // About section
    "about.title": "Who are we?",
    "about.description": "Corix Finanza is an innovative digital bank created to transform the financial sector in Spain.",
    "about.paragraph1": "Founded in 2022, our mission is to make banking services accessible, transparent and affordable for everyone, thanks to cutting-edge technology and a user-centered approach.",
    "about.paragraph2": "We believe that every person deserves simple and secure access to modern financial services, regardless of their income, location or education level.",
    "about.year": "Year of foundation",
    "about.countries": "Operational countries",
    
    // Team sections
    "team.ourTeam": "Our team",
    "team.experts": "Experts in finance, technology and innovation",
    "team.commitment": "Our commitment",
    "team.security": "Total security and regulatory compliance",
    "team.vision": "Our vision",
    "team.transform": "Transforming the African financial sector",
    
    // Promises section
    "promises.title": "Our promises to you",
    "promises.subtitle": "At Corix Finanza, we build a different banking experience",
    "promises.security": "Maximum security",
    "promises.securityDesc": "Banking encryption, two-factor authentication and regulated license",
    "promises.speed": "Instant speed",
    "promises.speedDesc": "Transfers in seconds, account opening in 5 minutes",
    "promises.transparency": "Total transparency",
    "promises.transparencyDesc": "No hidden fees. All rates displayed clearly",
    "promises.accessibility": "Accessible to all",
    "promises.accessibilityDesc": "Simple interface and support in local language",
    
    // Products section
    "products.title": "Our banking products",
    "products.subtitle": "Everything you need to manage your daily finances",
    "products.digitalAccount": "Digital account",
    "products.digitalDesc": "Open an account in minutes without paperwork. Receive your virtual card instantly.",
    "products.transfers": "Transfers",
    "products.transfersDesc": "Send money to your loved ones instantly, 24/7, with only 1% fee.",
    "products.savings": "Savings and credit",
    "products.savingsDesc": "Save automatically and access quick and transparent credits.",
    
    // Features
    "feature.banking": "Regulated banking license",
    "feature.countries": "3 countries: Spain, France, USA",
    "feature.mobile": "iOS & Android mobile app",
    
    // Testimonials
    "testimonials.title": "What our clients say",
    "testimonials.subtitle": "Join the community of 50,000+ satisfied users",
    
    // Stats testimonials
    "stats.rating": "Average rating on App Store",
    "stats.satisfied": "Satisfied clients",
    "stats.transferred": "Transferred this month",
    
    // CTA section
    "cta.title": "Ready to simplify your financial life?",
    "cta.subtitle": "Join the banking revolution in Europe",
    "cta.register": "Open my free account",
    "cta.login": "Login",
    
    // Advantages
    "advantage.quick": "Opening in 5 minutes",
    "advantage.noFees": "No hidden fees",
    "advantage.support": "7-day/week support",
    
    // Support section
    "support.title": "Support & Contact",
    "support.subtitle": "We are here to help you. Contact us through the channel that suits you best.",
    "support.phone": "Phone support",
    "support.phoneHours": "Monday to Friday, 8am-8pm",
    "support.email": "Email",
    "support.emailResponse": "Response within 24 hours",
    "support.helpCenter": "Help center",
    "support.faq": "FAQ, tutorials and guides",
    
    // Footer
    "footer.cgu": "Terms and Conditions",
    "footer.privacy": "Privacy",
    "footer.contact": "Contact",
    "footer.copyright": "© 2026 Corix Finanza. All rights reserved. Bank authorized and regulated in Spain.",
    
    // Common
    "common.viewAll": "View all",
    "common.more": "Learn more",
    "common.selectCountry": "Select country",
    "common.required": "Required",
    
    // Validation errors
    "validation.lastNameRequired": "Last name is required",
    "validation.lastNameMinLength": "Last name must be at least 2 characters",
    "validation.lastNameInvalid": "Last name must contain only letters",
    "validation.firstNameRequired": "First name is required",
    "validation.firstNameMinLength": "First name must be at least 2 characters",
    "validation.firstNameInvalid": "First name must contain only letters",
    "validation.cityRequired": "City is required",
    "validation.cityMinLength": "City must be at least 2 characters",
    "validation.professionMaxLength": "Profession must not exceed 100 characters",
    "validation.idTypeRequired": "ID document type is required",
    "validation.idNumberRequired": "ID document number is required",
    "validation.idNumberMinLength": "Number must be at least 4 characters",
    "validation.idNumberInvalid": "Invalid format (letters and numbers only)",
    "validation.idFileRequired": "ID document is required",
    "validation.idFileTooLarge": "File must not exceed 5MB",
    "validation.idFileInvalidType": "Invalid format (JPG, PNG or PDF only)",
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Invalid email format",
    "validation.passwordRequired": "Password is required",
    "validation.passwordMinLength": "At least 8 characters",
    "validation.passwordUppercase": "At least one uppercase letter",
    "validation.passwordNumber": "At least one number",
    "validation.confirmPasswordRequired": "Password confirmation is required",
    "validation.confirmPasswordMismatch": "Passwords do not match",
    "validation.phoneRequired": "Phone number is required",
    "validation.phoneInvalid": "Invalid phone number",
    "validation.termsRequired": "You must accept the terms and conditions",
    
    // 404 page
    "notFound.title": "Page not found",
    "notFound.subtitle": "Sorry, the page you are looking for does not exist or has been moved.",
    "notFound.backHome": "Back to home",
    "notFound.contactSupport": "Contact support",
    
    // Placeholders
    "placeholder.firstName": "Your first name",
    "placeholder.lastName": "Your last name",
    "placeholder.email": "your@email.com",
    "placeholder.subject": "Subject of your message",
    "placeholder.message": "Your message...",
    "placeholder.typeMessage": "Type your message...",
    "placeholder.briefProblem": "Briefly describe your problem",
    "placeholder.detailProblem": "Describe your problem in detail...",
    "placeholder.searchContact": "Search contact...",
    "placeholder.amount": "0.00",
    "placeholder.enterEmail": "Enter your email",
    "placeholder.enterLastName": "Enter your last name",
    "placeholder.enterFirstName": "Enter your first name",
    "placeholder.enterCity": "Enter your city",
    "placeholder.profession": "Ex: Engineer, Teacher, Merchant...",
    "placeholder.createPassword": "Create a password",
    "placeholder.confirmPassword": "Confirm your password",
    "placeholder.enterPassword": "Enter your password",
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialiser l'état avec la langue sauvegardée depuis localStorage
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["fr", "es", "en"].includes(savedLanguage)) {
        return savedLanguage
      }
    }
    return "fr"
  })

  // Pas besoin d'effet pour charger la langue initiale

  // Sauvegarder la langue dans localStorage et mettre à jour l'attribut lang du html
  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
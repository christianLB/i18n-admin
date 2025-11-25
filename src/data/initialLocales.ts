import type { LocalesData } from '../types';

/**
 * Sample initial locale data with extensive keys
 * Languages: EN (English), FR (French), DE (German)
 */
export const initialLocales: LocalesData = {
  en: {
    common: {
      ok: 'OK',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      loading: 'Loading...',
      close: 'Close',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome back',
      welcome: 'Welcome to the admin panel',
      stats: 'Statistics',
    },
    errors: {
      network: {
        timeout: 'Connection timeout',
        offline: 'You are offline',
        serverError: 'Server error occurred',
      },
      validation: {
        required: 'This field is required',
        invalidEmail: 'Invalid email address',
        passwordTooShort: 'Password is too short',
      },
    },
    forms: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Submit',
    },
  },
  fr: {
    common: {
      ok: 'OK',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      search: 'Rechercher',
      loading: 'Chargement...',
      close: 'Fermer',
    },
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      register: 'S\'inscrire',
      forgotPassword: 'Mot de passe oublié?',
      resetPassword: 'Réinitialiser le mot de passe',
    },
    dashboard: {
      title: 'Tableau de bord',
      subtitle: 'Bon retour',
      welcome: 'Bienvenue dans le panneau d\'administration',
      stats: 'Statistiques',
    },
    errors: {
      network: {
        timeout: 'Délai de connexion dépassé',
        offline: 'Vous êtes hors ligne',
        serverError: 'Erreur du serveur',
      },
      validation: {
        required: 'Ce champ est obligatoire',
        invalidEmail: 'Adresse e-mail invalide',
        passwordTooShort: 'Le mot de passe est trop court',
      },
    },
    forms: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'E-mail',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      submit: 'Soumettre',
    },
  },
  de: {
    common: {
      ok: 'OK',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      search: 'Suchen',
      loading: 'Laden...',
      close: 'Schließen',
    },
    auth: {
      login: 'Anmelden',
      logout: 'Abmelden',
      register: 'Registrieren',
      forgotPassword: 'Passwort vergessen?',
      resetPassword: 'Passwort zurücksetzen',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Willkommen zurück',
      welcome: 'Willkommen im Admin-Panel',
      // "stats" intentionally missing to demonstrate validation
    },
    errors: {
      network: {
        timeout: 'Verbindungszeitüberschreitung',
        offline: 'Sie sind offline',
        serverError: 'Serverfehler aufgetreten',
      },
      validation: {
        required: 'Dieses Feld ist erforderlich',
        invalidEmail: 'Ungültige E-Mail-Adresse',
        // "passwordTooShort" intentionally missing to demonstrate validation
      },
    },
    forms: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      submit: 'Absenden',
    },
  },
};

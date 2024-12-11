import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Verify computer": "Verify computer",
        "Register computer": "Register computer",
        "Register User": "Register User",
        "Welcome to DeviSec": "Welcome to DeviSec",
        "DeviSec description":
          "DeviSec is designed to digitize computer ownership verification and manage gate entries at the University of Rwanda campuses.",
        "Verify Computer": "Verify Computer",
        "Verify Computer Description":
          "Easily verify the ownership of computers using QR codes. Ensure that only authorized devices are allowed on campus.",
        "Register Computer": "Register Computer",
        "Register Computer Description":
          "Register new computers for students and guests. Generate unique QR codes for each device.",
        "Manage Gate Entries": "Manage Gate Entries",
        "Manage Gate Entries Description":
          "Efficiently manage gate entries and ensure the security of the campus. Monitor and control access points.",
        Copyright: "© 2024 DeviSec. All rights reserved.",
        "Privacy Policy": "Privacy Policy",
        "Terms of Service": "Terms of Service",
        "Camera based scan": "Camera based scan",
        "Start Scanning": "Start Scanning",
        "Scan an Image File": "Scan an Image File",
        "User Type": "User Type",
        "Select User Type": "Select User Type",
        "Serial No": "Serial No",
        "Enter the serial number": "Enter the serial number",
        Brand: "Brand",
        "Enter the brand": "Enter the brand",
        "Scan QR Code": "Scan QR Code",
        Register: "Register",
        "First Name": "First Name",
        "Enter your first name": "Enter your first name",
        "Last Name": "Last Name",
        "Enter your last name": "Enter your last name",
        "Registration No / National ID": "Registration No / National ID",
        "Enter your Registration Number (9 digits)":
          "Enter your Registration Number (9 digits)",
        "Capture Photo": "Capture Photo",
        "Open Camera": "Open Camera",
      },
    },
    fr: {
      translation: {
        "Verify computer": " Vérif. Ordinateur",
        "Register computer": " Enr. Ordinateur",
        "Register User": "Enr. Utilisateur",
        "Welcome to DeviSec": "Bienvenue à DeviSec",
        "DeviSec description":
          "DeviSec est conçu pour numériser la vérification de la propriété des ordinateurs et gérer les entrées de porte sur les campus de l'Université du Rwanda.",
        "Verify Computer": "Vérifier l'ordinateur",
        "Verify Computer Description":
          "Vérifiez facilement la propriété des ordinateurs à l'aide de codes QR. Assurez-vous que seuls les appareils autorisés sont autorisés sur le campus.",
        "Register Computer": "Enregistrer l'ordinateur",
        "Register Computer Description":
          "Enregistrez de nouveaux ordinateurs pour les étudiants et les invités. Générez des codes QR uniques pour chaque appareil.",
        "Manage Gate Entries": "Gérer les entrées de porte",
        "Manage Gate Entries Description":
          "Gérez efficacement les entrées de porte et assurez la sécurité du campus. Surveillez et contrôlez les points d'accès.",
        Copyright: "© 2024 DeviSec. Tous droits réservés.",
        "Privacy Policy": "Politique de confidentialité",
        "Terms of Service": "Conditions de service",
        "Camera based scan": "Scan basé sur la caméra",
        "Start Scanning": "Commencer le scan",
        "Scan an Image File": "Scanner un fichier image",
        "User Type": "Type d'utilisateur",
        "Select User Type": "Sélectionner le type d'utilisateur",
        "Serial No": "Numéro de série",
        "Enter the serial number": "Entrez le numéro de série",
        Brand: "Marque",
        "Enter the brand": "Entrez la marque",
        "Scan QR Code": "Scanner le code QR",
        Register: "Enregistrer",
        "First Name": "Prénom",
        "Enter your first name": "Entrez votre prénom",
        "Last Name": "Nom de famille",
        "Enter your last name": "Entrez votre nom de famille",
        "Registration No / National ID":
          "Numéro d'enregistrement / ID national",
        "Enter your Registration Number (9 digits)":
          "Entrez votre numéro d'enregistrement (9 chiffres)",
        "Capture Photo": "Capturer la photo",
        "Open Camera": "Ouvrir la caméra",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;

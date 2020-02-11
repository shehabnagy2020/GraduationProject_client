import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import wordsAr from "./langs/wordsAr.json";
import wordsEn from "./langs/wordsEn.json";
import errorsAr from "./langs/errorsAr.json";
import errorsEn from "./langs/errorsEn.json";
import successesAr from "./langs/successesAr.json";
import successesEn from "./langs/successesEn.json";
import inputsAr from "./langs/inputsAr.json";
import inputsEn from "./langs/inputsEn.json";
import labelsAr from "./langs/labelsAr.json";
import labelsEn from "./langs/labelsEn.json";
import btnsAr from "./langs/btnsAr.json";
import btnsEn from "./langs/btnsEn.json";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    words: wordsEn,
    errors: errorsEn,
    successes: successesEn,
    labels: labelsEn,
    btns: btnsEn,
    inputs: inputsEn
  },
  ar: {
    words: wordsAr,
    errors: errorsAr,
    successes: successesAr,
    labels: labelsAr,
    btns: btnsAr,
    inputs: inputsAr
  }
};

i18n
  // .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: ["en", "ar"],
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

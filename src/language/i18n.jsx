import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { useEffect, useState, useContext } from 'react';

import en from "./translation.en"
import ko from "./translation.ko"

const resources = {
    en: {
        translation: en
    },
    ko: {
        translation: ko
    }
};


const userLanguage = window.navigator.language;

const languages =  Object.keys(resources);

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: resources,
    lng: userLanguage,
    fallbackLng: "ko",
    debug: true,
    interpolation: {
        escapeValue: false,
    },
});

export {
    i18n,
    languages
}
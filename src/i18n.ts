import { createI18n } from "vue-i18n";
import en from "./assets/locales/en.json";
import ru from "./assets/locales/ru.json";

const numberFormats: any = {
  "ru-RU": {
    currency: {
      style: "currency",
      currency: "USD",
      notation: "standard",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  globalInjection: true,
  messages: {
    en,
    ru,
  },
  numberFormats,
});

export async function setLocale(locale: string) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);

    if (messages === undefined) {
      return;
    }

    i18n.global.setLocaleMessage(locale, messages);
  }

  i18n.global.locale.value = locale;
}

function loadLocale(locale: string) {
  return fetch(`./locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}

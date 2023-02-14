import { TranlationKeys, TranslationRecords } from './i18n.type';

type Locale = 'en' | 'cn';

const locales: { [key in Locale]?: TranslationRecords } = {};

class i18n {
  public static get(key: TranlationKeys, locale: Locale = 'en') {
    return locales[locale]?.[key] || key;
  }
}

export default i18n;

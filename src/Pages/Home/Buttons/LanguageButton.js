import { useTranslation } from "react-i18next";


export default function LanguageButton () {

    const { t, i18n } = useTranslation()

    const handleLanguageSwitch = lang => {
        i18n.changeLanguage(lang)
    }

    return (
        <div>
            <button
              style={{ color: "white" }}
              onClick={() => handleLanguageSwitch("en")}
            >
              {t("english")}
            </button>
            <button
              style={{ color: "white" }}
              onClick={() => handleLanguageSwitch("fr")}
            >
              {t("french")}
            </button>
          </div>
    )

}
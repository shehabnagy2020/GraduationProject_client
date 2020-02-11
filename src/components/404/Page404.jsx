import React from "react";
import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { i18n, t } = useTranslation();
  const changeLang = () => {
    if (i18n.language === "ar") i18n.changeLanguage("en");
    else i18n.changeLanguage("ar");
  };
  return (
    <div className="container">
      <h1 className="text-center" onClick={changeLang}>
        {t("words:pageNotFound")}
      </h1>
    </div>
  );
};

export default Page404;

// components/PageTitle.js
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
  const PageTitle = ({ title }) => {
     const { t } = useTranslation();
     const fullTitle = `${t(title)} | Joenda`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
        </Helmet>
    );
};

export default PageTitle;

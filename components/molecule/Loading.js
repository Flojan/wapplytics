import { useTranslation } from "react-i18next";
import Label from "../atoms/label";
import Spinner from "../atoms/Spinner";

const Loading = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col space-y-2 justify-center items-center min-h-screen">
      <Spinner />
      <Label value={t("loading")} />
    </div>
  );
};

export default Loading;

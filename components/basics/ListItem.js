import { useTranslation } from "react-i18next";
import InputField from "./InputField";

const ListItem = (props) => {
  const { t } = useTranslation("common");
  if (props.type === "website") {
    const scriptPath = `${window.location.origin}/wapplytics.js`;
    let trackingCode = `<script defer data-identifier="${props.website_nanoid}" src="${scriptPath}"></script>`;
    return (
      <div className="items-center grid grid-flow-row-dense grid-cols-3 h-10 ">
        <div>
          <span>{props.website_name}</span>
        </div>
        <div>
          <span>{props.website_url}</span>
        </div>
        <div>
          <InputField id={`script-${props.id}`} value={trackingCode} className="w-60" type="text" readOnly={true} />
        </div>
      </div>
    );
  } else if (props.type === "user") {
    return (
      <div className="items-center grid grid-flow-row-dense grid-cols-3 h-10 ">
        <div>
          <span>{props.username}</span>
        </div>
        <div>
          <span>{props.admin ? t("settings.yes") : t("settings.no")}</span>
        </div>
        <div></div>
      </div>
    );
  }
};

export default ListItem;

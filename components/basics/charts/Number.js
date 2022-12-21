import { BadgeDelta, Card, Metric, Text } from "@tremor/react";
import { Duration } from "luxon";
import { useTranslation } from "react-i18next";

const Number = (props) => {
  const { t } = useTranslation("common");

  let number = 0;
  let diff = 0;
  let positive = null;

  if (props.data) {
    number = props.data.number;
    diff = props.data.diff;
    diff === 0 ? (positive = null) : diff > 0 ? (positive = true) : (positive = false);
  }

  const numberText = () => {
    if (props.indicator === "avg-visit-time") {
      number = Duration.fromObject({ seconds: number });
      number = number.shiftTo("hours", "minutes", "seconds").toObject();
      if (number.hours) return number.hours + "h " + number.minutes + "m " + number.seconds + "s";
      else if (number.minutes) return number.minutes + "m " + number.seconds + "s";
      else if (number.seconds) return number.seconds + "s";
      else return "0s";
    } else if (props.indicator === "bounce-rate") {
      return number + "%";
    } else {
      if (number !== 0) return number;
      else return "0";
    }
  };

  const diffText = () => {
    if (props.indicator === "avg-visit-time") {
      diff = Duration.fromObject({ seconds: diff });
      diff = diff.shiftTo("hours", "minutes", "seconds").toObject();
      if (diff.hours) return (positive ? "+" : "") + diff.hours + "h " + diff.minutes + "m " + diff.seconds + "s";
      else if (diff.minutes) return (positive ? "+" : "") + diff.minutes + "m " + diff.seconds + "s";
      else if (diff.seconds) return (positive ? "+" : "") + diff.seconds + "s";
      else return "0s";
    } else if (props.indicator === "bounce-rate") {
      return (positive ? "+" : "") + diff + "%";
    } else {
      if (positive) return "+" + diff;
      else if (!positive) return "" + diff;
      else return "0";
    }
  };
  return (
    <Card key={""} marginTop="">
      <Text>{t("charts." + props.indicator)}</Text>
      <Metric>{numberText()}</Metric>
      {diff > 0 && (
        <BadgeDelta
          deltaType={`${props.indicator === "bounce-rate" ? "moderateDecrease" : "moderateIncrease"}`}
          text={diffText()}
          size="sm"
        />
      )}
      {diff < 0 && (
        <BadgeDelta
          deltaType={`${props.indicator === "bounce-rate" ? "moderateIncrease" : "moderateDecrease"}`}
          text={diffText()}
          size="sm"
        />
      )}
      {diff === 0 && <BadgeDelta deltaType="unchanged" text={diffText()} size="sm" />}
    </Card>
  );
};

export default Number;

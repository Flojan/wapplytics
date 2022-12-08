import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Icon from "../atoms/CustomIcon";
import Label from "../atoms/label";

const MenuItem = (props) => {
  return props.icon ? (
    props.href ? (
      <Link href={props.href} className="flex space-x-4 text-lg items-center">
        <Icon name={props.icon} />
        <Label value={props.value} />
      </Link>
    ) : (
      <Disclosure.Button className="flex space-x-4 text-lg items-center">
        <Icon name={props.icon} />
        <Label value={props.value} />
      </Disclosure.Button>
    )
  ) : (
    <Link href={props.href} className="flex items-center text-sm py-4 pl-12 h-6 overflow-hidden rounded">
      <Label value={props.value} />
    </Link>
  );
};

export default MenuItem;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <div>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <FontAwesomeIcon icon={faCircleStop} />
    </div>
  );
}

import styles from "./Toast.module.css";
import classNames from "classnames";

export default function Toast({ message, showToast }) {
  return (
    <div className={classNames(styles.toast, showToast ? styles.show : "")}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

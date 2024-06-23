import GitHubIcon from "@mui/icons-material/GitHub";
import pkg from "../../../package.json";

import styles from "./header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <span>
        Dice Roller 🎲 <code>v{pkg.version}</code>
      </span>

      <a href="https://github.com/radiovisual/dice-roller.ic">
        <GitHubIcon sx={{ color: "#fff" }} />
      </a>
    </div>
  );
}

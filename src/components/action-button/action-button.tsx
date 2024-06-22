import React from "react";

import type { ActionButtonProps } from "./types";

export function ActionButton(props: ActionButtonProps) {
  const { label, onClick } = props;
  return <button onClick={onClick}>{label}</button>;
}

import React, { ReactNode } from "react";

export interface CollapsableCardProps extends React.PropsWithChildren {
  title: string;
  buttonRow: ReactNode[];
}

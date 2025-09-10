import * as React from "react";

export type AuthTabsProps = {
  activeTab: 'login' | 'registration';
  setActiveTab: React.Dispatch<React.SetStateAction<'login' | 'registration'>>;
};
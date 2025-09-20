import type {
  ActiveTabType,
  TabNames
} from "@/pages/profile/types/activeTabType.ts";


export type Tab = {
  id: number;
  label: TabNames;
};

export type profileTabsProps = {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
};
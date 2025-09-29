import type {ServiceType} from "@/shared/types/serviceType.ts";

export type ServiceListProps = {
  servicesData: ServiceType[];
  isLoading: boolean;
  type: 'myProfile' | 'profile'
}
import { AlertVariant } from '~/components/ui/Alert/types';

enum NotificationType {
  temporary = 'temporary',
  persistent = 'persistent',
}

export type Notification = {
  text: string;
  id: string;
  variant?: `${Exclude<AlertVariant, AlertVariant.neutral>}`;
  type?: `${NotificationType}`;
  dismiss: () => void;
  key?: string;
};

export type AddNotificationParams = Pick<Notification, 'key' | 'text' | 'type' | 'variant'>;

export interface UseNotification {
  notifications: Ref<Notification[]>;
  addNotification: (params: AddNotificationParams) => () => void;
  success: (text: string, key?: string) => () => void;
  error: (text: string, key?: string) => () => void;
  warning: (text: string, key?: string) => () => void;
}

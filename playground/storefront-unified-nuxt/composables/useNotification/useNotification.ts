import { uniqueId } from 'lodash-es';
import { AddNotificationParams, UseNotification, Notification } from './types';

const timeToLive = 3000;

/**
 * @description Returns a composable object for managing notifications.
 *
 * @returns An object with the following properties:
 * - notifications: a computed property that returns an array of Notification objects
 * - addNotification: a function that adds a new Notification object to the notifications array
 * - error: a function that adds a new error Notification object to the notifications array
 * - success: a function that adds a new success Notification object to the notifications array
 *
 * @example
 * const { notifications, addNotification, error, success } = useNotification();
 * addNotification({ variant: 'error', text: 'Something went wrong' });
 * error('Something went wrong');
 * success('Something went right');
 */
export function useNotification(): UseNotification {
  const notifications = useState<Notification[]>('notifications', () => []);

  const addNotification = (params: AddNotificationParams): (() => void) => {
    const id = uniqueId('alerts');

    const dismiss = () => {
      notifications.value = notifications.value.filter((item) => item.id !== id);
    };

    const notification = {
      ...params,
      id,
      dismiss,
    };

    notifications.value = [...notifications.value, notification];

    if (notification.type !== 'persistent') {
      setTimeout(dismiss, timeToLive);
    }

    return dismiss;
  };

  return {
    notifications: computed(() => notifications.value),
    addNotification,
    error: (text, key) => addNotification({ variant: 'error', text, key }),
    success: (text, key) => addNotification({ variant: 'positive', text, key }),
    warning: (text, key) => addNotification({ variant: 'warning', text, key }),
  };
}

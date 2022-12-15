import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsrepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('shoud be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsrepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'another-recipient-id' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id',
    });

    expect(count).toEqual(2);
  });
});

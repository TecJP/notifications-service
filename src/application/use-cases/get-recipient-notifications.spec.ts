import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsrepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('shoud be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsrepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id' }),
        expect.objectContaining({ recipientId: 'recipient-id' }),
      ]),
    );
  });
});

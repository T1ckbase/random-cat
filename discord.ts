import { RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { getRandomCatImage } from './cat.ts';

export async function executeWebhook() {
  const webhookUrl = Deno.env.get('WEBHOOK_URL')!;

  const imageBlob = await getRandomCatImage();

  const formData = new FormData();

  const payload: RESTPostAPIWebhookWithTokenJSONBody = {
    avatar_url: 'https://raw.githubusercontent.com/T1ckbase/random-cat/refs/heads/main/catler.png',
    username: 'catler',
    attachments: [
      {
        id: 0,
        description: 'cat',
        filename: 'cat.jpg',
      },
    ],
  };

  formData.append('payload_json', JSON.stringify(payload));

  formData.append('files[0]', imageBlob, 'image.jpg');

  const response = await fetch(webhookUrl, {
    method: 'post',
    body: formData,
  });

  return response;
}

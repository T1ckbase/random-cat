import { executeWebhook } from './discord.ts';

Deno.cron('send cat photos', '0 0,12 * * *', async function () {
  const response = await executeWebhook();
  console.log(`${response.status} ${response.statusText}`);
});

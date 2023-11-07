import { Client, Snowflake, Message, TextChannel } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config({ override: true })

export const EVENTS_CHANNEL_ID: string = process.env.EVENTS_CHANNEL_ID!
export let eventsMessage: Message<true>

const client: Client<boolean> = new Client({
  intents: [Snowflake.Guilds, Snowflake.GuildMessages, Snowflake.MessageContent],
})

// ChatListener(client)

client.login(process.env.TOKEN).then(() => {
  console.log('Bot started')
})

client.once('ready', async () => reloadEvents())

export async function reloadEvents(): Promise<void> {
  const eventsChannel: TextChannel = client.channels.cache.get(EVENTS_CHANNEL_ID) as TextChannel

  await eventsChannel.bulkDelete(100)
  // todo
}

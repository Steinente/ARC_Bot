import { Client, EmbedBuilder, GatewayIntentBits, TextChannel } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config({ override: true })

export const EVENTS_CHANNEL_ID: string = process.env.EVENTS_CHANNEL_ID!

const apiEndpoint = 'https://animalrightscalendar.org/api/events/all'
const fetchInterval = 600000 // 10 minutes

const client: Client<boolean> = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

// ChatListener(client)

client.login(process.env.TOKEN).then(() => {
  console.log('Bot started')
})

client.once('ready', async () => {
  reloadEvents(client)
  setInterval(reloadEvents, fetchInterval)
})

export async function reloadEvents(client: Client): Promise<void> {
  const eventsChannel: TextChannel = client.channels.cache.get(EVENTS_CHANNEL_ID) as TextChannel

  // Delete 100 event-messages
  await eventsChannel.bulkDelete(100)

  console.log('Fetching data')
  try {
    // Fetch data from the external API
    const response = await fetch(apiEndpoint)
    const data = await response.json()

    // Check if the data has been updated
    if (data.docs) {
      console.log('Data fetched')
      const events = data.docs
      for (const event of events) {
        const embed = new EmbedBuilder()
          .setTitle(event.title)
          .setDescription(`Location: ${event.location}\nID: ${event.id}`)
          .setTimestamp(new Date(event.updatedAt))

        eventsChannel.send({ embeds: [embed] })
      }
    }
  } catch (error) {
    console.error('Error fetching and posting data:', error)
  }
}

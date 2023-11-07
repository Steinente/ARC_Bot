import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, GuildMember, Message, StageChannel } from 'discord.js'

export default interface Event {
  id: string
  title: string
  start: string
  end: string
  description: string
  location: string
  group: string
  _status: Status
  createdAt: string
  updatedAt: string
  organizer: string
}

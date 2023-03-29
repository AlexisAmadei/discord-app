const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createinvite')
		.setDescription('Creates an invite link for the server.'),
	async execute(interaction) {
		const permissions = interaction.channel.permissionsFor(interaction.client.user);
		if (!permissions.has('CREATE_INSTANT_INVITE')) {
			return interaction.reply('I do not have permission to create an invite link in this channel');
		}

		const invite = await interaction.channel.createInvite({
			maxAge: 3600, // in seconds
			maxUses: 1
		});

		return interaction.reply(`Here's your invite link: ${invite.url} \n*You have one hour to use it..(tick, tack)*`);
	},
};

/** Support destinations remain empty until a human verifies them. */
export const supportChannels = [
  { name: 'Patreon', detail: 'Apoyo recurrente', status: 'pendiente', destinationType: 'url', approvedValue: null },
  { name: 'Ko-fi', detail: 'Apoyo puntual', status: 'pendiente', destinationType: 'url', approvedValue: null },
  { name: 'PayPal', detail: 'Apoyo directo', status: 'pendiente', destinationType: 'url', approvedValue: null },
  { name: 'Nequi', detail: 'Para Colombia', status: 'pendiente', destinationType: 'recipient', approvedValue: null },
  { name: 'Daviplata', detail: 'Para Colombia', status: 'pendiente', destinationType: 'recipient', approvedValue: null },
  { name: 'Vaki', detail: 'Campaña activa', status: 'inactivo', destinationType: 'url', approvedValue: null },
];

export function isActionable(channel) {
  return channel.status === 'verificado' && typeof channel.approvedValue === 'string' && channel.approvedValue.length > 0;
}

export function visibleSupportChannels(channels = supportChannels) {
  return channels.filter((channel) => channel.name !== 'Vaki' || isActionable(channel));
}

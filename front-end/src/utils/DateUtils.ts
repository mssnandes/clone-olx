export const DateFormat = (date: string) => {
  return new Date(date).toLocaleDateString() + ' às ' + new Date(date).toLocaleTimeString([], {timeStyle: 'short'});
};

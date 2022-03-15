export const handleUrl = () => {
  const url = window.location.href;
  const newUrl = url.slice(0, url.lastIndexOf('/'));
  if (url.includes('in-progress')) {
    return newUrl;
  }
  return url;
};

export const teste = () => {
  console.log('teste');
};

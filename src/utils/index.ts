export const youTubeGetID = (urlParam: string) => {
  const url = urlParam.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  // eslint-disable-next-line no-useless-escape
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : undefined;
};

export const vimeoGetID = (url: string) => {
  const regEx =
    /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
  const match = url.match(regEx);
  if (match && match.length == 7) {
    const videoId = match[6];
    return videoId;
  } else {
    return null;
  }
};

export const youTubeGetID = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : undefined;
  };

export const vimeoGetID = (url) => {
    let regEx =
      /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
    let match = url.match(regEx);
    if (match && match.length == 7) {
      let videoId = match[6];
      return videoId;
    } else {
      return null;
    }
};
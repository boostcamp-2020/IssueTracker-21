export default function calcTime(time) {
  const timeData = new Date(time);
  const now = new Date();
  let diff = (now - timeData) / 1000;

  if (diff < 60) {
    return Math.floor(diff) + ` seconds ago`;
  } else if ((diff /= 60) < 60) {
    return Math.floor(diff) + ` mins ago`;
  } else if ((diff /= 60) < 24) {
    return Math.floor(diff) + ` hours ago`;
  } else {
    diff /= 24;
    return Math.floor(diff) + ` days ago`;
  }
}

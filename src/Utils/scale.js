export default function getScale() {
  const { innerWidth } = window;

  if (innerWidth >= 1430) {
    return 200;
  }

  if (innerWidth > 520 && innerWidth < 1430) {
    return 300;
  }

  if (innerWidth <= 520) {
    return 450;
  }
}

export default function getRandomColor() {
    const randColor = "#" + Math.round(Math.random()* 0xFFFFFF).toString(16);
    return randColor;
}
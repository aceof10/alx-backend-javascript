import ClassRoom from './0-classroom';

export default function initializeRooms() {
  const sizes = [19, 20, 34];
  const arr = [];

  sizes.forEach((size) => {
    const room = new ClassRoom(size);
    arr.push(room);
  });

  return arr;
}

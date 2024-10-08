export default function (list, city) {
  return list.filter((student) => student.location === city);
}

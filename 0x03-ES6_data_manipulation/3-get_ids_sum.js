export default function getStudentIdsSum(list) {
  return list.map((student) => student.id)
    .reduce((sum, current) => sum + current, 0);
}

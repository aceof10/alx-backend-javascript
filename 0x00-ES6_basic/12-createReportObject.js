export default function createReportObject(employeeList) {
  return {
    allEmployees: { ...employeeList },

    getNumberOfDepartments() {
      return Object.keys(employeeList).length;
    },
  };
}

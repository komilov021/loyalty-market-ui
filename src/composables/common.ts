export const onlyNumber = ($event: any) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    $event.preventDefault();
  }
};
export const filterNumberInput = (value: string) => {
  return value.replace(/[^0-9]/g, ""); // Faqat raqamlarni qoldiradi
};
// export const onCheckValue = (value: any, name: string) => {
//   if (ruleForm.hasOwnProperty(name)) {
//     if (typeof ruleForm[name] === "number" || ruleForm[name] === null) {
//       ruleForm[name] = value === "" || isNaN(Number(value)) ? null : Number(value);
//     } else {
//       ruleForm[name] = value;
//     }
//   } else {
//     console.warn(`The field "${name}" does not exist in ruleForm.`);
//   }
// };


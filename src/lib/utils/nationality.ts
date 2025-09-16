// Maps nationality string to emoji with thai name
export const getNationalityDisplay = (nationality: string) => {
  switch (nationality) {
    case "myanmar":
      return "🇲🇲 เมียนม่า";
    case "laos":
      return "🇱🇦 ลาว";
    case "cambodia":
      return "🇰🇭 กัมพูชา";
    default:
      return "🏳️ ไม่ทราบ";
  }
};

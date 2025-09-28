import { Agent, AgentTableHeader } from "@/types";

export const agentTableHeaders: AgentTableHeader[] = [
  {
    index: "header-1",
    headerName: "อีเมล",
  },
  {
    index: "header-2",
    headerName: "ชื่อ-สกุล",
  },
  {
    index: "header-3",
    headerName: "สถานะ",
  },
  {
    index: "header-4",
    headerName: "การดำเนินการ",
  },
];

export const mockAgents: Agent[] = [
  {
    citizenId: "1101700234567",
    email: "teeradej.w@example.com",
    firstname: "ธีรเดช",
    lastname: "วัฒนากิจไพศาล",
    status: "active",
    addressDetails: "123/45 ถนนสุขุมวิท",
    subDistrict: "พระโขนง",
    district: "เขตคลองเตย",
    province: "กรุงเทพมหานคร",
    postelCode: "10110",
  },
  {
    citizenId: "1101700234568",
    email: "sudarat.p@example.com",
    firstname: "สุดารัตน์",
    lastname: "ผลเจริญ",
    status: "active",
    addressDetails: "88/9 หมู่ 2",
    subDistrict: "เทพารักษ์",
    district: "อำเภอบางพลี",
    province: "สมุทรปราการ",
    postelCode: "10540",
  },
  {
    citizenId: "1101700234569",
    email: "anusorn.k@example.com",
    firstname: "อนุสรณ์",
    lastname: "เกียรติศักดิ์",
    status: "inactive",
    addressDetails: "56 ถนนนิมมานเหมินท์ ซอย 11",
    subDistrict: "สุเทพ",
    district: "อำเภอเมืองเชียงใหม่",
    province: "เชียงใหม่",
    postelCode: "50200",
  },
  {
    citizenId: "1101700234570",
    email: "kanokwan.t@example.com",
    firstname: "กนกวรรณ",
    lastname: "ทรัพย์เพิ่ม",
    status: "active",
    addressDetails: "199/7 ถนนติวานนท์",
    subDistrict: "บางกระสอ",
    district: "อำเภอเมืองนนทบุรี",
    province: "นนทบุรี",
    postelCode: "11000",
  },
  {
    citizenId: "1101700234571",
    email: "prasit.n@example.com",
    firstname: "ประสิทธิ์",
    lastname: "ณรงค์ชัย",
    status: "inactive",
    addressDetails: "45/3 หมู่บ้านสวนดอกไม้",
    subDistrict: "ตลาด",
    district: "อำเภอเมืองมหาสารคาม",
    province: "มหาสารคาม",
    postelCode: "44000",
  },
  {
    citizenId: "1101700234572",
    email: "natthanan.s@example.com",
    firstname: "ณัฐธนัช",
    lastname: "ศรีวัฒนา",
    status: "active",
    addressDetails: "12/6 ถนนเยาวราช",
    subDistrict: "เวียง",
    district: "อำเภอเมืองเชียงราย",
    province: "เชียงราย",
    postelCode: "57000",
  },
  {
    citizenId: "1101700234573",
    email: "warangkana.k@example.com",
    firstname: "วรางคณา",
    lastname: "คำพันธ์",
    status: "inactive",
    addressDetails: "77/12 ถนนบางแสนสาย 2",
    subDistrict: "แสนสุข",
    district: "อำเภอเมืองชลบุรี",
    province: "ชลบุรี",
    postelCode: "20130",
  },
  {
    citizenId: "1101700234574",
    email: "chatchai.r@example.com",
    firstname: "ชาติชาย",
    lastname: "เรืองฤทธิ์",
    status: "inactive",
    addressDetails: "9/99 ถนนราชดำเนิน",
    subDistrict: "ในเมือง",
    district: "อำเภอเมืองนครราชสีมา",
    province: "นครราชสีมา",
    postelCode: "30000",
  },
  {
    citizenId: "1101700234575",
    email: "pimchanok.t@example.com",
    firstname: "พิมพ์ชนก",
    lastname: "ทองศรี",
    status: "active",
    addressDetails: "234/5 ถนนประชาอุทิศ",
    subDistrict: "บางมด",
    district: "เขตทุ่งครุ",
    province: "กรุงเทพมหานคร",
    postelCode: "10140",
  },
  {
    citizenId: "1101700234576",
    email: "surasak.m@example.com",
    firstname: "สุรศักดิ์",
    lastname: "มีศักดิ์",
    status: "inactive",
    addressDetails: "18/4 ถนนเลียบชายหาดป่าตอง",
    subDistrict: "ป่าตอง",
    district: "อำเภอกะทู้",
    province: "ภูเก็ต",
    postelCode: "83150",
  },
];

export const countTotalAgents = (): number => mockAgents.length;

export const countActiveAgents = (): number =>
  mockAgents.filter((agent) => agent.status === "active").length;

export const countInactiveAgents = (): number =>
  mockAgents.filter((agent) => agent.status === "inactive").length;

export const findMockAgentById = (id: string) =>
  mockAgents.find((agent) => agent.citizenId === id);

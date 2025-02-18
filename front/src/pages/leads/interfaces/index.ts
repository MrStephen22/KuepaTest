export interface FormData {
  full_name: string;
  firstName: string;
  lastName: string;
  documentType: "cc" | "ti" | "pp" | "nt";
  document: string;
  email: string;
  interestProgram: "free" | "paid";
  mobile_phone: string;
}

export enum ContractEnum {
  Fulltime = "Fulltime", 
  Permanent = "Permanent", 
  Temporary = "Temporary", 
  PartTime = "PartTime", 
  Internship = "Internship",
  Others = "Others"
}


export interface MissionFilter {
  companies?: string[]
  salary?: { min?: number, max?: number }
}
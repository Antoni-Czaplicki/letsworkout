export interface Holiday {
  date: Date;
  name: string;
  type:
    | "MAJOR_HOLIDAY"
    | "PUBLIC_HOLIDAY"
    | "OBSERVANCE"
    | "NATIONAL_HOLIDAY"
    | "FEDERAL_HOLIDAY"
    | "SEASON"
    | "STATE_HOLIDAY"
    | "OPTIONAL_HOLIDAY"
    | "CLOCK_CHANGE_DAYLIGHT_SAVING_TIME"
    | "LOCAL_HOLIDAY"
    | "UNITED_NATIONS_OBSERVANCE"
    | "OBSERVANCE_CHRISTIAN"
    | "BANK_HOLIDAY"
    | "COMMON_LOCAL_HOLIDAY"
    | "NATIONAL_HOLIDAY_CHRISTIAN"
    | "CHRISTIAN"
    | "OBSERVANCE_HEBREW"
    | "JEWISH_HOLIDAY"
    | "MUSLIM"
    | "HINDU_HOLIDAY"
    | "RESTRICTED_HOLIDAY"
    | "OFFICIAL_HOLIDAY"
    | "NATIONAL_HOLIDAY_ORTHODOX"
    | "LOCAL_OBSERVANCE";
}

export interface ApiResponseHoliday extends Omit<Holiday, "date"> {
  date: string;
}

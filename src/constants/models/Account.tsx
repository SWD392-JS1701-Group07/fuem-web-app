export type Account = {
    name: string;
    subjectId: number;
    email: string,
    username: string,
    password: string,
    studentId: string,
    phoneNumber: string,
    dob: Date,
    gender: string,
    avatarUrl: string,
    roleId: number,
};
export type AccountCreateModel = {
    name: string,
    email: string,
    username: string,
    password: string,
    studentId: string | null,
    phoneNumber: string,
    dob: Date,
    gender: string,
    avatarUrl: string,
    roleId: number,
    subjectId: number | null,
}
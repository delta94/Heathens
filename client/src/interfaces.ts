
const severityTypes = [ 'error', 'warning', 'info', 'success' ] as const;
export interface ISeverities
{
    type: typeof severityTypes[number];
}

export interface ISnackbarProps
{
    severity: ISeverities;
    message: string;
    isActive: boolean;
}

export interface ILogin
{
    username: string,
    password: string;
}

export interface IRegister
{
    name: string;
    email: string;
    username: string,
    password: string;
}
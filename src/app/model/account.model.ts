export interface AccounDetails {
    accountId:           string;
    balance:             number;
    currentPage:         number;
    pageSize:            number;
    totalPages: number;
    accountOperationDTO: AccountOperations[];
}
export interface AccountOperations {
    amount:      number;
    date:        Date;
    description: string;
    id:          number;
    type:        string;
}

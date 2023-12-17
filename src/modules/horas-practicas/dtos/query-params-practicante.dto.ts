import { IsOptional, IsString } from "class-validator";

export class QueryParamsPracticanteDto{
    @IsOptional()
    @IsString()
    readonly nombres?: string;  
}
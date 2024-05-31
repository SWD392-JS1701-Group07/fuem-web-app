import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";

type Option = {
    label: string;
    url: string;
}
type InfoBoxProps = {
    title: string;
    value: string | number;
    percent: number;
    options: Option[];
}

const InfoBox = ({ title, value, percent, options }: InfoBoxProps) => {
    return (
        <div className="m-5">
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        {title}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" className=''><Ellipsis className="size-5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {options.map((option, index) => (
                                    <DropdownMenuItem key={index}><Link to={option.url}>{option.label}</Link></DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{value}</div>
                    {(percent < 0) ?
                        <div className="text-red-500 flex">
                            <TrendingUp />
                            <div>{percent}%</div>
                        </div>
                        :
                        <div className="text-green-500 flex">
                            <TrendingDown />
                            <div>+{percent}%</div>
                        </div>}
                </CardContent>
            </Card>
        </div>
    )
}
export default InfoBox;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
type AccInfoBoxProps = {
    title: string;
    value: number;
    createPermit: boolean;
    viewLink: string;
    createLink: string;
}
const AccInfoBox = ({ title, value, createPermit, viewLink, createLink }: AccInfoBoxProps) => {
    const nav = useNavigate();
    return (
        <div className="w-full">
            <Card x-chunk="dashboard-01-chunk-2" className="m-5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between">
                        <div className="text-md">Account number: {value}</div>
                        <div>
                            <Button variant="default" className="mr-1 min-w-44" onClick={() => nav(viewLink)}>View all {title}</Button>
                            {createPermit ?
                                <Button variant="default" className="ml-4 mr-1 min-w-44" onClick={() => nav(createLink)}>create new {title}</Button>
                                : <></>
                            }

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}

export default AccInfoBox;
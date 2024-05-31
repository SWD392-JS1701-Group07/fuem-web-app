"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    BarChart,
    XAxis,
    YAxis,
    Bar,
    ResponsiveContainer
} from "recharts";

type Props = {};

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000
    }
];

const ColumnDiagram = ({ }: Props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-8/12 m-2 mx-7">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <ResponsiveContainer width={"100%"} height={350}>
                        <BarChart data={data}>
                            <XAxis
                                dataKey={"name"}
                                tickLine={false}
                                axisLine={false}
                                stroke="#000000"
                                fontSize={12}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                                fontSize={12}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer> */}
                </CardContent>
            </Card>
        </div>
    );
}
export default ColumnDiagram;
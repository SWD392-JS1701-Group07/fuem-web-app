"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    BarChart,
    XAxis,
    YAxis,
    Bar,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    Legend
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
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-4/6 m-2 mx-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#888888" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
export default ColumnDiagram;
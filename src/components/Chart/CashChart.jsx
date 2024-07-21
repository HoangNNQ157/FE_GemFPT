import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatVND } from "../../utils/funUtils";

const CashChart = ({ data }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={400}
            style={{ fontSize: "10px" }}
        >
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employeeName" />
                <YAxis tickFormatter={formatVND} />
                <Tooltip formatter={(value) => formatVND(value)} />
                <Legend />
                <Bar
                    dataKey="totalRevenue"
                    fill="#8884d8"
                    name="Total Revenue Cash"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CashChart;

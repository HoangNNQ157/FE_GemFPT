import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const RevenueChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(data).map((stall, index) => (
                    <Line
                        key={stall}
                        type="monotone"
                        dataKey={`stall_${stall}`}
                        stroke={`hsl(${index * 60}, 70%, 50%)`}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;

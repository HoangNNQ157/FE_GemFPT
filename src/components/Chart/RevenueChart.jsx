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
import { formatVND } from "../../utils/funUtils";

const RevenueChart = ({ data }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={400}
            style={{ fontSize: "10px" }}
        >
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatVND} />
                <Tooltip formatter={(value) => formatVND(value)} />
                <Legend />
                {Object.keys(data[0] || {})
                    .filter((key) => key !== "month")
                    .map((stall, index) => (
                        <Line
                            key={stall}
                            type="monotone"
                            dataKey={stall}
                            stroke={`hsl(${index * 60}, 70%, 50%)`}
                        />
                    ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;

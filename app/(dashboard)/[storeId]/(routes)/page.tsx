import { CreditCard, DollarSign, Package } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { Overview } from "@/components/overview";

interface DashboardPageProps {
    params: Promise<{
        storeId: string;
    }>;
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const { storeId } = await params;

    const totalRevenue = await getTotalRevenue(storeId);
    const graphRevenue = await getGraphRevenue(storeId);
    const salesCount = await getSalesCount(storeId);
    const stockCount = await getStockCount(storeId);

    return (
        <div className="flex-col bg-gray-50/30 min-h-screen">
            <div className="flex-1 space-y-6 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <Heading title="Dashboard" description="Overview of your store's performance" />
                </div>
                <Separator className="bg-gray-200/60" />
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                Total Revenue
                            </CardTitle>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight text-gray-900">
                                {formatter.format(totalRevenue)}
                            </div>
                            <p className="text-xs text-gray-400 mt-1 font-medium italic">+2.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Sales</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight text-gray-900">+{salesCount}</div>
                            <p className="text-xs text-gray-400 mt-1 font-medium italic">Confirmed transactions</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Inventory</CardTitle>
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Package className="h-4 w-4 text-orange-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight text-gray-900">{stockCount}</div>
                            <p className="text-xs text-gray-400 mt-1 font-medium italic">Active products in catalog</p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="w-full border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-800">Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
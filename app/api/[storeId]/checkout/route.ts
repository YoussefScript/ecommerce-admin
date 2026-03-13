import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb  from "@/lib/prismadb";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new NextResponse(null, { headers: corsHeaders });
};

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;
        const { productIds } = await req.json();

        if (!productIds || productIds.length === 0) {
            return NextResponse.json({ error: "Product IDs are required" }, { status: 400, headers: corsHeaders });
        };

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        if (products.length === 0) {
            return NextResponse.json({ error: "No products found" }, { status: 400, headers: corsHeaders });
        }
        
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            line_items.push({
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price.toNumber() * 100,
                }
            });
        });

        const order = await prismadb.order.create({
            data: {
                storeId: storeId,
                isPaid: false,
                orderItems: {
                    create: products.map((product) => ({
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
                    })),
                },
            },
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },                  
            success_url: `${process.env.FRONT_END_STORE_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONT_END_STORE_URL}/cart?canceled=1`,
            metadata: {
                orderId: order.id,
            },
        });

        return NextResponse.json({ url: session.url }, {
            headers: corsHeaders,
        });
    } catch (error: any) {
        console.log("[CHECKOUT_POST]", error);
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
};

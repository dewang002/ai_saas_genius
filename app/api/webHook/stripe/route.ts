import Stripe from "stripe";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {
    const body = await req.text();

    const signature = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new NextResponse(`webhook error : ${errorMessage}`, { status: 400 });
    }



    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed") {
        try {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            ) as Stripe.Subscription;

            if (!session?.metadata?.userId) {
                return new NextResponse("user id required", { status: 400 })
            }

            await prismadb.userSubscription.create({
                data: {
                    userId: session?.metadata?.userId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: subscription.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                },
            })
        } catch {
            return new NextResponse("Internal error during session completion", { status: 500 });
        }
    }

    if (event.type === "invoice.payment_succeeded") {
        try {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            ) as Stripe.Subscription

            await prismadb.userSubscription.update({
                where: {
                    stripeSubscriptionId: subscription.id
                },
                data: {
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                },
            })
        } catch {
            return new NextResponse("Internal error during invoice update", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 })
}
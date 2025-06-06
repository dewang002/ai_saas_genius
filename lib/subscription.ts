import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export const checkSubscripton = async () => {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSubscription) {
        return false;
    }
    const periodEnd = userSubscription.stripeCurrentPeriodEnd?.getTime();
    const isValid = userSubscription.stripePriceId && periodEnd && periodEnd + Date.now();

    return !!isValid;
}
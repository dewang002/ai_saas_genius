import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { MAX_FREE_COUNT } from "@/Constant";

export const increaseApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    })

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userId: userId
            },
            data: {
                count: userApiLimit.count + 1
            },
        })
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId: userId,
                count: 1
            }
        })
    }

}

export const checkApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
    }
};

export const getApiCount = async () => {
    const { userId } = await auth();

    if (!userId) {
        return 0;
    }
    const remaning = await prismadb.userApiLimit.findFirst({
        where: {
            userId
        },
    })

    if (remaning) {
        return remaning?.count
    } else {
        return 0    
    }

}
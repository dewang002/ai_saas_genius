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
            }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        })
    }
}

export const checkApiLimit = async () => {
    const { userId } = await auth();
    if (!userId) {
        return
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    })

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
    }
}
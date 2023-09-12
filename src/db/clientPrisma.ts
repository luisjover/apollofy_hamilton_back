// import Prisma from '@prisma/client';

// const prismaClient = new Prisma.PrismaClient();

// export default prismaClient;

import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient as MongoClient } from "../../prisma/generated/mongo_client";
import { Prisma } from "@prisma/client";

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const mongoClient = new MongoClient();

export let prismaClient = mongoClient;

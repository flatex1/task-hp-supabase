import { Context } from "bun";
import { createBooking } from '../models/bookingModel';

export async function addBooking(ctx: Context) {
    try {
        const newBooking = await createBooking(await ctx.request.json());
        return new Response(JSON.stringify(newBooking), { status: 201 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

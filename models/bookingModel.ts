import { supabase } from '../services/supabaseClient';

export interface Booking {
    id?: number;
    name: string;
    email: string;
    phone: string;
    people: number;
    date: string;
    time: string;
}

export const createBooking = async (booking: Booking) => {
    const { data, error } = await supabase
        .from('booking')
        .insert([booking]);

    if (error) throw error;
    return data;
};

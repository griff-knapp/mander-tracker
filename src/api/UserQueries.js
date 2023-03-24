import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_KEY);

export async function getUsers() {
    // console.log(supabase);
    const { data: user, error } = await supabase.from('user').select();
    console.log(user);
    return user;
}

export async function getGames() {
    const { data: gameArray, error } = await supabase
        .from('getgamer')
        .select('*');
    console.log(gameArray);
    return gameArray;
}
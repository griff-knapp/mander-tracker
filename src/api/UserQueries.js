import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_KEY);

export async function getUsers() {
    // console.log(supabase);
    const { data: user, error } = await supabase.from('user').select();
    // console.log(user);
    return user;
}

export async function getGames() {
    const { data: gameArray, error } = await supabase
        .from('getgamelist')
        .select('*');
    // console.log(gameArray);
    return gameArray;
}

export async function addGame(name, pcount, winner, duration, fun=null, most_damage=null, knockout_order=Array(0), userGameArray) {
    const { data, error } = await supabase
        .from('game')
        .insert({ 
            name: name,
            player_count: pcount,
            winner_ref: winner,
            stats: {
                "duration": duration,
                "fun_meter": fun,
                "most_damage": most_damage,
                "knockout_order": knockout_order
            }
        })
        .select();
    if (error) {
        console.log(error);
    }
    console.log(data);
    const gameData = data;
    console.log(userGameArray);
    userGameArray.forEach(async (entry) => {
        const { data, error } = await supabase
            .from('user_game')
            .insert({
                ...entry, game_ref: gameData[0].id
            })
            .select();
        // console.log(data);
        if (error) {
            console.log(error);
        }
    });
    // const { error2 } = await supabase
    //     .from('user_game')
    //     .insert({

    //     })
}
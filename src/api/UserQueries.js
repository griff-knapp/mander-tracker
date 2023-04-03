import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_KEY);

export async function getUsers() {
    // console.log(supabase);
    const { data: user, error } = await supabase.from('user').select();
    if (error) console.log(error);

    return user;
}

export async function getGames() {
    const { data: gameArray, error } = await supabase
        .from('getgames')
        .select('*');
        if (error) console.log(error);
        return gameArray;
}

export async function getGame(uuid) {
    const dataGame = await supabase
        .from('game')
        .select('id, created_at, name, winner_ref, stats')
        .eq('uuid', uuid);

    if (dataGame.error) console.log(dataGame.error);

    const dataWinner = await supabase
        .from('user')
        .select('id, name')
        .eq('id', dataGame.data[0].winner_ref);
    
    if (dataWinner.error) console.log(dataWinner.error);

    const dataPlayers = await supabase
        .from('user_game')
        .select('user_ref, stats, info:user_ref(id, name)')
        .eq('game_ref', dataGame.data[0].id);
    // console.log(dataPlayers);
    if (dataPlayers.error) console.log(dataPlayers.error);
    
    return {gameData: dataGame.data[0], winnerData: dataWinner.data[0], playerData: dataPlayers.data};
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
    // console.log(data);
    const gameData = data;
    console.log(userGameArray);
    userGameArray.forEach(async (entry) => {
        const { error } = await supabase
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
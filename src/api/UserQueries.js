import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_PUBLIC_KEY);

export async function getUsers() {
    // console.log(supabase);
    const { data: user, error } = await supabase
        .from('getusers')
        .select(`*`);
    if (error) console.log(error);
    console.log(user);
    return user;
}

export async function getUser(email) {
    const { data: user, error } = await supabase
        .from('getuser')
        .select('*')
        .eq('email', email);
    
    if (error) console.log(error);

    return user;
}

export async function getUsersByPodGame(podUUID) {
    // console.log(supabase);
    const { data: user, error } = await supabase
        .from('getusers')
        .select(`*`)
        .eq('pod_uuid', podUUID.slice(1));
    if (error) console.log(error);
    console.log(user);
    return user;
}

export async function getUsersByPod(podUUID) {
    // console.log(supabase);
    const { data: user, error } = await supabase
        .from('getusersbypod')
        .select(`*`)
        .eq('pod_uuid', podUUID.slice(1));
    if (error) console.log(error);
    console.log(user);
    return user;
}

export async function getGames(podUUID) {
    const { data: gameArray, error } = await supabase
        .from('getgames')
        .select('*')
        .eq('pod_uuid', podUUID.slice(1));
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
        .from('getusergames')
        // .select('user_ref, stats, info:user_ref(id, name)')
        .select('*')
        .eq('game_ref', dataGame.data[0].id);
    console.log(dataPlayers);
    if (dataPlayers.error) console.log(dataPlayers.error);
    
    return {gameData: dataGame.data[0], winnerData: dataWinner.data[0], playerData: dataPlayers.data};
}

export async function addGame(name, pcount, winner, duration, fun=null, most_damage=null, knockout_order=Array(0), userGameArray, podRef) {
    let podId = await supabase
        .from('pod')
        .select('id')
        .eq('uuid', podRef);
    
    if (podId.error) console.log(podId.error);
    console.log(podId);
    let { data, error } = await supabase
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
            },
            pod_ref: podId.data[0].id
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

    const winrateResponse = await supabase
        .from('user')
        .select('stats')
        .eq('id', winner);

    const updateJson = {
        stats: {
            ...winrateResponse.data[0].stats,
            'winrate': winrateResponse.data[0].stats.winrate + 1 
        }
    };

    const updateWinrateResponse = await supabase
        .from('user')
        .update(updateJson)
        .eq('id', winner)
        .select('*');

    if (updateWinrateResponse.error) {
        console.log(updateWinrateResponse.error);
    }
}

export async function addUser(name, email) {
    const { data, error } = await supabase
        .from('user')
        .insert({ name: name, email: email, stats: { winrate: 0 } })
        .select();
    
    if (error) console.log(error);

    return data;
}

export async function getDecklist(id) {
    const { data: decklist, error } = await supabase
        .from('deck')
        .select('name, commander, created_at')
        .eq('user_ref', id);
    
    if (error) console.log(error);

    return decklist;
}

export async function addDeck(name, commander, id) {
    const { data, error } = await supabase
        .from('deck')
        .insert({ name: name, commander: commander, user_ref: id })
        .select();
    
    if (error) console.log(error);

    return data;
}

export async function setGameDecks(playerDecks, gameID) {
    Object.keys(playerDecks).forEach(async (playerID) => {
        if (playerDecks[playerID] !== '') {
            console.log(playerDecks[playerID]);
            const { error } = await supabase
            .from('user_game')
            .update({
                deck_ref: playerDecks[playerID]
            })
            .eq('user_ref', playerID)
            .eq('game_ref', gameID);

            if (error) console.log(error);
        }
    });
    
    
    return;
}

export async function getUserPods(userID) {
    const { data: podlist, error } = await supabase
        .from('getuserpods')
        .select('*')
        .eq('user_ref', userID);

    if (error) console.log(error);

    return podlist;
}

export async function createPod(podName, userID) {
    const { data, error } = await supabase
        .from('pod')
        .insert({ name: podName })
        .select();
    
    if (error) { 
        console.log(error);
    } else {
        const dataUserPod = await supabase
        .from('user_pod')
        .insert({ pod_ref: data[0].id, user_ref: userID, is_admin: true });

        if (dataUserPod.error) {
            console.log(dataUserPod.error);
        }
    }
    return data;
}

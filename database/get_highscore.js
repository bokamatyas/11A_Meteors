export default async function get_highscores(amount_of_players) {
    //Returns a json with the highscores in it in descending order. (Highest on top)
    const response = await $.ajax({
        type: 'GET',
        url: './database/get_score.php',
        data: { amount_of_players: amount_of_players },
        dataType: 'json',
        success: (response) => {
            // Handle the response if needed
            return response;
        },
        error: (xhr, status, error) => {
            // Handle errors if any
            console.error(error);
        }
    });
    return response;
}
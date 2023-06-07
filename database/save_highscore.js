export default function save_highscore(player_name, score) {ű
    //Returns nothing, but writes an entry into the database
    $.ajax({
        type: 'GET',
        url: './database/set_score.php',
        data: { player_name: player_name, score: score },
        dataType: 'text',
        success: (response) => {
            // Handle the response if needed
            console.log(response);
        },
        error: (xhr, status, error) => {
            // Handle errors if any
            console.error(error);
        }
    });
}
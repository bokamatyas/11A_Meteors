<?php
$amount_of_datas = $_GET['amount_of_players'];
$conn = new mysqli('darkauran.hu', 'root', '', 'meteors');
$stmt = $conn->prepare("SELECT player_name, score FROM highscorses ORDER BY score DESC LIMIT ?;");
$stmt->bind_param("i", $amount_of_datas);
$stmt->execute();
$stmt->bind_result($name, $score);
$data = array();
while ($stmt->fetch()) {
  $row = array(
    'player_name' => $name,
    'score' => $score
  );
  $data[] = $row;
}
$jsonData = json_encode($data);
echo $jsonData;

$stmt->close();
$conn->close();
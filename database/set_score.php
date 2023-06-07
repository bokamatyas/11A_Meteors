<?php
$score = $_GET['score'];
$name = $_GET['player_name'];
echo($score);
$conn = new mysqli('localhost','root', '', 'meteors');
$stmt = $conn->prepare("INSERT INTO `highscorses` (`player_name`, `score`) VALUES (?, ?)");
$stmt->bind_param("si", $name, $score);
$stmt->execute();
$stmt->close();
$conn->close();
$response = array('status' => 'success', 'player_name' => $name);
echo json_encode($response);

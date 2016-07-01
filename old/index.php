<?php

require 'vendor/autoload.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->get('/', function () {
  echo "Api AdEventos ";
});

$app->post('/signup','signup');
$app->post('/signin','signin');

$app->run();

function getConn() {
  $conn = new PDO("mysql:host=localhost;dbname=adeventos_db", "root", "");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $conn;
}

function signup() {
  $request = \Slim\Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  $password = md5($user->password);
  try {
    $conn = getConn();
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    $user->id = $conn->lastInsertId();
    $user->error = "0";
    echo json_encode($user);
  }
  catch(PDOException $e) {
    echo '{"error":"1" ,"code":"'.$e->getCode().'", "text":"'. $e->getMessage() .'"}';
  }
  $conn = null;
}

function signin() {
  $request = \Slim\Slim::getInstance()->request();
  $user = json_decode($request->getBody());
  $password = md5($user->password);
  try {
    $conn = getConn();
    $stmt = $conn->prepare("SELECT * FROM users WHERE email=:email AND password=:password");
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    $user = $stmt->fetchObject();
    $user->error = "0";
    echo json_encode($user);
  }
  catch(PDOException $e) {
    echo '{"error":"1" ,"code":"'.$e->getCode().'", "text":"'. $e->getMessage() .'"}';
  }
  $conn = null;
}
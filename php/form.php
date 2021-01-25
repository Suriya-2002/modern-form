<?php

require './config.php';

$rootPath = '/modern-form/';

if (isset($_POST['submit'])) {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $emailAddress = $_POST['email-address'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $dateOfBirth = $_POST['date-of-birth'];

    $sql = "INSERT INTO response (firstName, lastName, emailAddress, age, gender, dateOfBirth) VALUES (:firstName, :lastName, :emailAddress, :age, :gender, :dateOfBirth)";
    $statement = $connection->prepare($sql);
    $statement->execute(['firstName' => $firstName, 'lastName' => $lastName, 'emailAddress' => $emailAddress, 'age' => $age, 'gender' => $gender, 'dateOfBirth' => $dateOfBirth]);

    header('Location: ' . $rootPath . 'thank-you.html');
}